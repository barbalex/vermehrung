import axios from 'redaxios'

import constants from './constants'

const config = {
  url: constants?.getHealthUri(),
  timeout: 5000, // timeout error happens after 5 seconds
}

const isOnline = async () => {
  let res
  try {
    // based on: https://hasura.io/docs/1.0/graphql/core/api-reference/health.html
    res = await axios.get(config.url, { timeout: config.timeout })
  } catch (error) {
    // error can also be caused by timeout
    return false
  }
  if (res.status === 200) return true
  return false
}

export default isOnline
