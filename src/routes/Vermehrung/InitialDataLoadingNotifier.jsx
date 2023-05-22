import { useContext } from 'react'
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
  } = store

  const existsUser = !!user?.uid

  if (existsUser && !gettingAuthUser && online && !initialDataQueried) {
    addNotification({
      message: `lade Daten für offline-Nutzung (${tableNames(
        initiallyQuerying,
      )})`,
      type: 'info',
      duration: 2000,
    })
  }

  return null
}

export default observer(InitialDataLoadingNotifier)
