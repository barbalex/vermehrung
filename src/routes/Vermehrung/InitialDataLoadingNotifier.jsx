import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../mobxStoreContext.js'
import { tableNames } from '../../utils/tableNames.js'

export const InitialDataLoadingNotifier = observer(() => {
  const store = useContext(MobxStoreContext)
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
})
