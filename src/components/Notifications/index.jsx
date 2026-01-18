import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import { MdClose as CloseIcon } from 'react-icons/md'
import { sortBy } from 'es-toolkit'

import styles from './index.module.css'

import { MobxStoreContext } from '../../mobxStoreContext.js'
import { Notification } from './Notification.jsx'

export const Notifications = observer(() => {
  const store = useContext(MobxStoreContext)
  const {
    removeAllNotifications,
    notifications,
    // addNotification
  } = store

  // uncomment for testing
  // addNotification({
  //   title: 'title',
  //   message:
  //     'hi from test, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, ',
  //   actionName: 'doThis',
  //   actionLabel: 'do this',
  //   duration: 1000000,
  // })

  const notificationsSorted = sortBy([...notifications.values()], ['time'])
    .reverse()
    // limit to 5
    .slice(0, 4)

  if (notificationsSorted.length === 0) return null

  return (
    <div className={styles.container}>
      {notificationsSorted.map((n) => (
        <Notification
          key={n.id}
          notification={n}
        />
      ))}
      {notificationsSorted.length > 2 && (
        <IconButton
          key="close"
          aria-label="Close"
          color="secondary"
          onClick={removeAllNotifications}
          title="Alle Meldungen schliessen"
          size="small"
          edge="start"
          className={styles.iconButton}
        >
          <CloseIcon />
        </IconButton>
      )}
    </div>
  )
})
