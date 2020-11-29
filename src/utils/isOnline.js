import axios from 'redaxios'

import getConstants from './constants'

const constants = getConstants()
const config = {
  url: constants?.healthUri,
  timeout: 5000,
}

const isOnline = async () => {
  let res
  try {
    res = await axios.get(config.url, { timeout: config.timeout })
  } catch (error) {
    // error can also be caused by timeout
    return false
  }
  if (res.status === 200) return true
  return false
}

export default isOnline
