import { constants } from './constants.js'
import { fetchWithTimeout } from './fetchWithTimeout.js'

export const isOnline = async () => {
  // if we are on localhost, we are always online
  if (window?.location?.hostname === 'localhost') return true

  // based on: https://hasura.io/docs/1.0/graphql/core/api-reference/health.html
  let res
  try {
    res = await fetchWithTimeout(constants?.getHealthUri(), {}, 5000)
  } catch {
    // error can also be caused by timeout
    return false
  }
  return res.status === 200
}
