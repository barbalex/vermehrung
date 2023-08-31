import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import StoreContext from '../../storeContext'
import tableNames from '../../utils/tableNames'

const InitialDataLoadingNotifier = () => {
  const store = useContext(StoreContext)
  const {
    gettingAuthUser,
    initialDataQueried,
    initiallyQuerying,
    user,
    online,
    addNotification,
    removeNotificationById,
  } = store

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
    addNotification,
    existsUser,
    gettingAuthUser,
    initialDataQueried,
    initiallyQuerying,
    online,
    removeNotificationById,
  ])

  return null
}

export default observer(InitialDataLoadingNotifier)
