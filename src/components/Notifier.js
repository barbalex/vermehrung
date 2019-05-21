import React, { useEffect, useContext, useState } from 'react'
import { withSnackbar } from 'notistack'
import { observer } from 'mobx-react-lite'

import storeContext from '../storeContext'

const Notifier = ({ enqueueSnackbar }) => {
  const store = useContext(storeContext)
  const { notifications, enqueNotification, removeNotification } = store
  const [displayed, setDisplayed] = useState([])
  console.log('Notifier rendering', {
    notifications,
    enqueNotification,
    removeNotification,
  })

  useEffect(() => {
    console.log('Notifier, useEffect', { notifications })
    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed
      if (displayed.includes(notification.key)) return
      // Display snackbar using notistack
      enqueueSnackbar(notification.message, notification.options)
      // Keep track of snackbars that we've displayed
      setDisplayed([...displayed, notification.key])
      // Dispatch action to remove snackbar from mobx store
      removeNotification(notification.key)
    })
  }, [notifications.length])

  return null
}

export default withSnackbar(observer(Notifier))
