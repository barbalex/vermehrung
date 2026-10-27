import { useEffect } from 'react'
import { useAtomValue } from 'jotai'

import {
  authorizingAtom,
  userAtom,
  apiClientAtom,
  dbAtom,
  store,
} from '../../store/index.js'
import { getAuthToken } from '../../utils/getAuthToken.js'
import { removeOrtsangaben } from '../../utils/removeOrtsangaben.js'
import { startSyncPoller, stopSyncPoller } from '../../utils/syncPoller.js'

// starts the delta sync polling once the user and their api token are
// ready. Replaces the graphql-ws subscriptions.
export const SubscriptionsInitializer = () => {
  const authorizing = useAtomValue(authorizingAtom)
  const user = useAtomValue(userAtom)
  const apiClient = useAtomValue(apiClientAtom)

  useEffect(() => {
    let isActive = true
    if (!!user?.uid && !authorizing) {
      // need to fetch the user role first:
      // gaertner must not keep ortsangaben synced earlier
      const getUserRole = async () => {
        while (isActive) {
          try {
            const rows = await store
              .get(apiClientAtom)
              .get(
                `/person?account_id=eq.${user.uid}&select=id,user_role(name)`,
              )
            const role = rows?.[0]?.user_role?.name
            if (!role) {
              // no role: retry, the person might just have been created
              console.log('user has no role yet, retrying')
              await new Promise((resolve) => setTimeout(resolve, 5000))
              continue
            }
            return role
          } catch (error) {
            console.log('error getting user role, retrying:', error)
            if (error.status === 401) {
              await getAuthToken()
            }
            await new Promise((resolve) => setTimeout(resolve, 5000))
          }
        }
      }
      getUserRole().then((userRole) => {
        if (!isActive) return
        if (userRole === 'gaertner') {
          // need to remove some data for gaertner in case they had
          // synced them earlier
          removeOrtsangaben({ db: store.get(dbAtom) })
        }
        startSyncPoller()
      })
    }
    return function cleanup() {
      isActive = false
      stopSyncPoller()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizing, apiClient, user?.uid])

  return null
}
