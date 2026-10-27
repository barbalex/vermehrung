import { constants } from './constants.js'
import { fetchWithTimeout } from './fetchWithTimeout.js'

// thin PostgREST client. Network failures (fetch TypeError) and timeouts
// (AbortError) propagate as thrown errors - like the fetches before them
// did, so checkForOnlineError keeps working. Api errors (4xx/5xx) throw
// an Error carrying status, code and details from the PostgREST body.
const request = async (method, path, { body, prefer } = {}) => {
  const headers = { accept: 'application/json' }
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
    let data = null
    try {
      data = await res.json()
    } catch {
      // non-json error body
    }
    const error = new Error(
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

export const apiClient = {
  request,
  get: (path) => request('GET', path),
  post: (path, body, prefer = 'return=minimal') =>
    request('POST', path, { body, prefer }),
  patch: (path, body, prefer = 'return=minimal') =>
    request('PATCH', path, { body, prefer }),
  delete: (path, prefer = 'return=minimal') =>
    request('DELETE', path, { prefer }),
}
