import { useEffect, useContext, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import StoreContext from '../../storeContext.js'

const AuthorizingObserver = () => {
  const store = useContext(StoreContext)
  const { gettingAuthUser, addNotification, removeNotificationById } = store

  const authorizingNotificationId = useRef(null)

  useEffect(() => {
    if (gettingAuthUser && !authorizingNotificationId.current) {
      authorizingNotificationId.current = addNotification({
        message: `autorisiere`,
        type: 'info',
        duration: 100000,
      })
      return
    }
    if (!gettingAuthUser && authorizingNotificationId.current) {
      removeNotificationById(authorizingNotificationId.current)
      authorizingNotificationId.current = undefined
    }
  }, [addNotification, gettingAuthUser, removeNotificationById])

  return null
}

export default observer(AuthorizingObserver)
