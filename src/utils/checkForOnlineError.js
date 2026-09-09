import { setShortTermOnline } from '../store/index.js'

export const checkForOnlineError = ({ error }) => {
  if (error.message.includes('Failed to fetch')) {
    console.log('checkForOnlineError, network is failing')
    setShortTermOnline(false)
    return
  }
}
