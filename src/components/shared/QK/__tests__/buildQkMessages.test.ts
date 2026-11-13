import { describe, expect, it } from 'vitest'

import { buildQkMessages, labelOf } from '../buildQkMessages.ts'

const buildRow = (id: string, overrides: Record<string, unknown> = {}) => ({
  id,
  label: {
    pipe: () => ({ toPromise: () => Promise.resolve(`label:${id}`) }),
  },
  ...overrides,
})

describe('buildQkMessages', () => {
  it('maps only the failing rows to url and text', async () => {
    const messages = await buildQkMessages({
      rows: [buildRow('a'), buildRow('b')],
      failsCheck: (row) => row.id === 'b',
      buildUrl: (row) => ['Kulturen', row.id],
      buildText: (row) => `text:${row.id}`,
    })

    expect(messages).toEqual([{ url: ['Kulturen', 'b'], text: 'text:b' }])
  })

  it('resolves label texts asynchronously', async () => {
    const messages = await buildQkMessages({
      rows: [buildRow('a'), buildRow('b')],
      failsCheck: () => true,
      buildUrl: () => ['Kulturen', 'x'],
      buildText: (row) => labelOf(row),
    })

    expect(messages.map((m) => m.text)).toEqual(['label:a', 'label:b'])
  })

  it('returns empty when nothing fails', async () => {
    const messages = await buildQkMessages({
      rows: [buildRow('a')],
      failsCheck: () => false,
      buildUrl: () => [],
      buildText: () => '',
    })

    expect(messages).toEqual([])
  })

  it('labelOf tolerates a throwing label', async () => {
    const row = {
      id: 'x',
      label: {
        pipe: () => ({
          toPromise: () => Promise.reject(new Error('no label')),
        }),
      },
    }
    expect(await labelOf(row)).toBe('')
  })
})
