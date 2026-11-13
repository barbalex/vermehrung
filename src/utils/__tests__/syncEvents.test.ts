import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  startSyncEvents,
  stopSyncEvents,
  syncEventsConnected,
} from '../syncEvents.ts'

// builds a Response whose body emits the given strings as separate
// read() chunks - one chunk per string, so chunk-boundary buffering is
// exercised like with a real network stream
// like streamResponse, but the stream stays open after the chunks -
// a real SSE server never closes the connection on its own
const openStreamResponse = (chunks: string[]) => {
  const encoder = new TextEncoder()
  let i = 0
  const stream = new ReadableStream<Uint8Array>({
    pull: (controller) => {
      if (i < chunks.length) {
        controller.enqueue(encoder.encode(chunks[i]))
        i++
      }
      // no close: read() stays pending, like an idle event stream
    },
  })
  return new Response(stream, {
    status: 200,
    headers: { 'content-type': 'text/event-stream' },
  })
}

// a stream that emits ': connected' on start and stays open until end()
// is called - lets the test control when the server drops the connection
const controlledStream = () => {
  const encoder = new TextEncoder()
  let streamController: ReadableStreamDefaultController<Uint8Array> | null =
    null
  const stream = new ReadableStream<Uint8Array>({
    start: (controller) => {
      streamController = controller
      controller.enqueue(encoder.encode(': connected\n\n'))
    },
  })
  return {
    response: new Response(stream, {
      status: 200,
      headers: { 'content-type': 'text/event-stream' },
    }),
    end: () => streamController?.close(),
  }
}

const stubWindow = (token: string | null) =>
  vi.stubGlobal('window', {
    location: { hostname: 'localhost', host: 'localhost:5175' },
    localStorage: { getItem: () => token },
  })

const tick = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('syncEvents', () => {
  afterEach(() => {
    stopSyncEvents()
    vi.unstubAllGlobals()
  })

  it('emits a signal for changed events split across chunk boundaries', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        openStreamResponse([
          ': connected\n',
          '\n',
          'event: chan',
          `ged\ndata: ["art"]\n\n`,
        ]),
      )
    vi.stubGlobal('fetch', fetchMock)
    stubWindow('token')

    const onSignal = vi.fn()
    const onStateChange = vi.fn()
    startSyncEvents(onSignal, onStateChange)
    await tick(50)

    expect(onSignal).toHaveBeenCalledTimes(1)
    expect(syncEventsConnected()).toBe(true)
    // state change fired for the connect
    expect(onStateChange).toHaveBeenCalled()
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:7010/events',
      expect.objectContaining({
        headers: { authorization: 'Bearer token' },
      }),
    )
  })

  it('ignores heartbeats and comments', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          openStreamResponse([': connected\n\n', ': heartbeat\n\n']),
        ),
    )
    stubWindow('token')

    const onSignal = vi.fn()
    startSyncEvents(onSignal, vi.fn())
    await tick(50)

    expect(onSignal).not.toHaveBeenCalled()
  })

  it('sends the authorization header only when a token exists', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(openStreamResponse([': connected\n\n']))
    vi.stubGlobal('fetch', fetchMock)
    stubWindow(null)

    startSyncEvents(vi.fn(), vi.fn())
    await tick(50)

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ headers: {} }),
    )
  })

  it('marks disconnected when the stream ends', async () => {
    const resolvers: ((value: unknown) => void)[] = []
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(
        () =>
          new Promise((resolve) => {
            resolvers.push(resolve as (value: unknown) => void)
          }),
      ),
    )
    stubWindow('token')

    const onStateChange = vi.fn()
    startSyncEvents(vi.fn(), onStateChange)
    await tick(10)
    // hand out an open stream, then hold the reconnect fetch open so
    // the connected state stays false after the disconnect
    const first = controlledStream()
    resolvers[0](first.response)
    await tick(50)
    expect(syncEventsConnected()).toBe(true)
    // the server drops the connection
    first.end()
    await tick(50)
    expect(syncEventsConnected()).toBe(false)
    await tick(1100) // reconnect delay is 1000ms
    expect(resolvers.length).toBe(2) // reconnecting
    expect(onStateChange).toHaveBeenCalledTimes(2)
    // stop before the held-open reconnect fetch resolves
    stopSyncEvents()
    resolvers[1]?.(controlledStream().response)
    await tick(10)
    expect(syncEventsConnected()).toBe(false)
  })
})
