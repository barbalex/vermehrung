import { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import StoreContext from '../../storeContext'
import initializeSubscriptions from '../../utils/initializeSubscriptions'

const SubscriptionsInitializer = () => {
  const store = useContext(StoreContext)
  const { authorizing, user, gqlClient } = store
  const { wsReconnectCount } = store.tree

  const existsUser = !!user?.uid

  useEffect(() => {
    console.log('vermehrung, subscription effect', { authorizing, existsUser })
    let unsubscribe
    if (existsUser && !authorizing) {
      // need to fetch user to get role
      // then pass role to initializeSubscriptions to skip fields
      // this user has no access to
      // would be much nicer if hasura simply passed null values
      // https://github.com/hasura/graphql-engine/issues/6541
      // inherited roles not working as they can not be added to existing users
      gqlClient
        .query(
          gql`
        query userRoleQuery {
          person(
            where: {account_id: {_eq: ${user.uid}}}
          ) {
            id
            person_user_role {
              id
              name
            }
          }
        }
      `,
        )
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then(({ data, error }) => {
          // error not caught > user will get to much data
          const userRole = data?.person?.[0]?.person_user_role?.name
          unsubscribe = initializeSubscriptions({ store, userRole })
        })
    }
    return function cleanup() {
      if (unsubscribe && Object.values(unsubscribe)) {
        Object.values(unsubscribe).forEach((value) => value?.unsubscribe?.())
      }
    }
    // wsReconnectCount is made so a subscription can provoke re-subscription on error
    // see initializeSubscriptions, unsubscribe.ae_art
  }, [existsUser, store, wsReconnectCount, authorizing, gqlClient, user.uid])

  return null
}

export default observer(SubscriptionsInitializer)
