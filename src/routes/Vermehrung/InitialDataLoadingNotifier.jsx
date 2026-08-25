import { useEffect } from 'react'
import { useAtomValue } from 'jotai'

import {
  gettingAuthUserAtom,
  initialDataQueriedAtom,
  initiallyQueryingAtom,
  userAtom,
  onlineAtom,
  addNotification,
  removeNotificationById,
  removeAllNotifications,
} from '../../store/index.js'
import { tableNames } from '../../utils/tableNames.js'

export const InitialDataLoadingNotifier = () => {
  const gettingAuthUser = useAtomValue(gettingAuthUserAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)
  const initiallyQuerying = useAtomValue(initiallyQueryingAtom)
  const user = useAtomValue(userAtom)
  const online = useAtomValue(onlineAtom)

  const existsUser = !!user?.uid

  useEffect(() => {
    let id
    if (existsUser && !gettingAuthUser && online && !initialDataQueried) {
      id = addNotification({
        message: `lade Daten für offline-Nutzung (${tableNames(
          initiallyQuerying,
        )})`,
        type: 'info',
        duration: 2000,
      })
    }

    return () => {
      if (id) {
        // TODO: remove log
        console.log('removing notification on unmount:', id)
        removeNotificationById(id)
      }
    }
  }, [
    existsUser,
    gettingAuthUser,
    initialDataQueried,
    initiallyQuerying,
    online,
  ])

  // ensure all initial loading notifications are removed after 8s
  useEffect(() => {
    if (!initialDataQueried) return
    setTimeout(() => {
      console.log('initial data queried, removing all notifications')
      removeAllNotifications()
    }, 5000)
  }, [initialDataQueried])

  return null
}
