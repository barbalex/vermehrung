import { setShortTermOnline } from '../store/index.ts'

export const checkForOnlineError = ({ error }) => {
  if (error.message.includes('Failed to fetch')) {
    console.log('checkForOnlineError, network is failing')
    setShortTermOnline(false)
    return
  }
}
