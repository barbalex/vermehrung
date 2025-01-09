export const checkForOnlineError = ({ error, store }) => {
  if (!store) return
  if (error.message.includes('Failed to fetch')) {
    console.log('checkForOnlineError, network is failing')
    store.setShortTermOnline(false)
    return
  }
}
