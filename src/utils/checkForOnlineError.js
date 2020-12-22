const checkForOnlineError = ({ error, store }) => {
  if (error.message.includes('Failed to fetch')) {
    console.log('checkForOnlineError, network is failing')
    store.setShortTermOnline(false)
    return
  }
}

export default checkForOnlineError
