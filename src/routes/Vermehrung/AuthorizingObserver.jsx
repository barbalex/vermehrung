import { useEffect, useRef } from 'react'
import { useAtomValue } from 'jotai'

import {
  gettingAuthUserAtom,
  addNotification,
  removeNotificationById,
} from '../../store/index.js'

export const AuthorizingObserver = () => {
  const gettingAuthUser = useAtomValue(gettingAuthUserAtom)

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
  }, [gettingAuthUser])

  return null
}
