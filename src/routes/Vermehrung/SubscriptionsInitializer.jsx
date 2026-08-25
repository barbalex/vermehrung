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
    // console.log('vermehrung, subscription effect', {
    //   authorizing,
    //   userUid: user?.uid,
    //   gqlClient,
    // })
    let unsubscribe
    if (!!user?.uid && !authorizing) {
      // need to fetch user to get role
      // then pass role to initializeSubscriptions to skip fields
      // this user has no access to
      // would be much nicer if hasura simply passed null values
      // https://github.com/hasura/graphql-engine/issues/6541
      // inherited roles not working as they can not be added to existing users
      // console.log('vermehrung, subscription effect, fetch user role')
      gqlClient
        .query(
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then(({ data, error }) => {
          if (error) {
            console.log('error getting user role:', error)
          }
          // error not caught > user will get too much data
          // console.log('got user role, initializing subscriptions, data:', data)
          const userRole = data?.person?.[0]?.person_user_role?.name
          unsubscribe = initializeSubscriptions({ userRole })
        })
        .catch((error) => {
          console.log('error caught getting user role:', error)
        })
    }
    return function cleanup() {
      if (unsubscribe && Object.values(unsubscribe)) {
        Object.values(unsubscribe).forEach((value) => value?.unsubscribe?.())
      }
    }
  }, [wsReconnectCount, authorizing, gqlClient, user?.uid])

  return null
}
