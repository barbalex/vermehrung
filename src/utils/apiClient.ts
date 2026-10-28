import { constants } from './constants.ts'
import { fetchWithTimeout } from './fetchWithTimeout.ts'
import { ApiError, type ApiClient } from './apiTypes.ts'

// thin PostgREST client. Network failures (fetch TypeError) and timeouts
// (AbortError) propagate as thrown errors - like the fetches before them
// did, so checkForOnlineError keeps working. Api errors (4xx/5xx) throw
// an ApiError carrying status, code and details from the PostgREST body.
const request = async (
  method: string,
  path: string,
  { body, prefer }: { body?: unknown; prefer?: string } = {},
): Promise<unknown> => {
  const headers: Record<string, string> = { accept: 'application/json' }
  const token = window.localStorage.getItem('token')
  if (token) headers.authorization = `Bearer ${token}`
  if (body !== undefined) headers['content-type'] = 'application/json'
  if (prefer) headers.prefer = prefer

  const res = await fetchWithTimeout(
    `${constants.getApiUri()}${path}`,
    {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    },
    15000,
  )

  if (!res.ok) {
    let data: { message?: string; code?: string; details?: unknown } | null =
      null
    try {
      data = await res.json()
    } catch {
      // non-json error body
    }
    const error = new ApiError(
      data?.message ?? `api request failed with status ${res.status}`,
    )
    error.status = res.status
    error.code = data?.code
    error.details = data?.details
    throw error
  }

  if (res.status === 204) return null
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

export const apiClient: ApiClient = {
  request,
  get: (path) => request('GET', path),
  post: <T>(path: string, body?: unknown, prefer = 'return=minimal') =>
    request('POST', path, { body, prefer }) as Promise<T>,
  patch: <T>(path: string, body?: unknown, prefer = 'return=minimal') =>
    request('PATCH', path, { body, prefer }) as Promise<T>,
  delete: (path: string, prefer = 'return=minimal') =>
    request('DELETE', path, { prefer }),
}
