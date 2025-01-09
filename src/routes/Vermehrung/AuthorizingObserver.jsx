import { useEffect, useContext, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../mobxStoreContext.js'

export const AuthorizingObserver = observer(() => {
  const store = useContext(MobxStoreContext)
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
})
