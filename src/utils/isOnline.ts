import { constants } from './constants.ts'
import { fetchWithTimeout } from './fetchWithTimeout.ts'

export const isOnline = async () => {
  // the browser reports no connection: no point in fetching anything.
  // must run before the localhost shortcut below: offline emulation
  // (e2e) and dev machines without connectivity must still boot the
  // app from local data instead of hammering failing requests
  if (!window?.navigator?.onLine) return false
  // if we are on localhost, we are always online
  if (window?.location?.hostname === 'localhost') return true

  // the api root doubles as the health endpoint: PostgREST serves
  // the OpenApi spec there without authentication
  let res
  try {
    res = await fetchWithTimeout(constants?.getHealthUri(), {}, 5000)
  } catch {
    // error can also be caused by timeout
    return false
  }
  return res.status === 200
}
