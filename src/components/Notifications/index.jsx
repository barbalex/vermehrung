import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import { MdClose as CloseIcon } from 'react-icons/md'
import { sortBy } from 'es-toolkit'

import styles from './index.module.css'

import { notificationsAtom, removeAllNotifications } from '../../store/index.js'
import { Notification } from './Notification.jsx'

export const Notifications = () => {
  const notifications = useAtomValue(notificationsAtom)

  // uncomment for testing
  // addNotification({
  //   title: 'title',
  //   message:
  //     'hi from test, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, we will try writing a very long message, ',
  //   actionName: 'removeQueuedQueryById',
  //   actionLabel: 'do this',
  //   duration: 1000000,
  // })

  const notificationsSorted = sortBy(notifications, ['time'])
    .reverse()
    // limit to 5
    .slice(0, 4)

  if (notificationsSorted.length === 0) return null

  return (
    <div className={styles.container}>
      {notificationsSorted.map((n) => (
        <Notification key={n.id} notification={n} />
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
}
