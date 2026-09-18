import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import gql from 'graphql-tag'

import {
  authorizingAtom,
  userAtom,
  gqlClientAtom,
  wsReconnectCountAtom,
} from '../../store/index.js'
import { initializeSubscriptions } from '../../utils/initializeSubscriptions.js'

export const SubscriptionsInitializer = () => {
  const authorizing = useAtomValue(authorizingAtom)
  const user = useAtomValue(userAtom)
  const gqlClient = useAtomValue(gqlClientAtom)
  // wsReconnectCount is made so a subscription can provoke re-subscription on error
  // see initializeSubscriptions, unsubscribe.ae_art
  const wsReconnectCount = useAtomValue(wsReconnectCountAtom)

  useEffect(() => {
    let isActive = true
    let unsubscribe
    if (!!user?.uid && !authorizing) {
      // need to fetch user to get role
      // then pass role to initializeSubscriptions to skip fields
      // this user has no access to
      // would be much nicer if hasura simply passed null values
      // https://github.com/hasura/graphql-engine/issues/6541
      // inherited roles not working as they can not be added to existing users
      // urql requests are neither retried nor timed out by default:
      // a single stalled request would hang the boot forever. Retry!
      const getUserRole = async () => {
        while (isActive) {
          try {
            const { data, error } = await gqlClient.query(
              gql`
                query userRoleQuery($uid: String!) {
                  person(where: { account_id: { _eq: $uid } }) {
                    id
                    person_user_role {
                      id
                      name
                    }
                  }
                }
              `,
              { uid: user.uid },
            )
            if (error) throw error
            return data?.person?.[0]?.person_user_role?.name
          } catch (error) {
            console.log('error getting user role, retrying:', error)
            await new Promise((resolve) => setTimeout(resolve, 5000))
          }
        }
      }
      getUserRole().then((userRole) => {
        if (!isActive) return
        unsubscribe = initializeSubscriptions({ userRole })
      })
    }
    return function cleanup() {
      isActive = false
      if (unsubscribe && Object.values(unsubscribe)) {
        Object.values(unsubscribe).forEach((value) => value?.unsubscribe?.())
      }
    }
  }, [wsReconnectCount, authorizing, gqlClient, user?.uid])

  return null
}
