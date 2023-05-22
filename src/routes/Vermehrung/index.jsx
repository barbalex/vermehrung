import React, { useEffect, useContext, lazy } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'
import gql from 'graphql-tag'

import StoreContext from '../../storeContext'
import activeNodeArrayFromPathname from '../../utils/activeNodeArrayFromPathname'
import openNodesFromActiveNodeArray from '../../utils/openNodesFromActiveNodeArray'
import initializeSubscriptions from '../../utils/initializeSubscriptions'
const Login = lazy(() => import('../../components/Login'))
const ErrorBoundary = lazy(() =>
  import('../../components/shared/ErrorBoundary'),
)
const ApiDetector = lazy(() => import('../../components/ApiDetector'))
const QueuedQueries = lazy(() => import('../../components/QueuedQueries'))
import tableNames from '../../utils/tableNames'
import constants from '../../utils/constants'
const VermehrungComponent = lazy(() => import('./Vermehrung'))
const AuthorizingObserver = lazy(() => import('./AuthorizingObserver'))
const StoragePersister = lazy(() => import('./StoragePersister'))

const Container = styled.div`
  min-height: calc(100vh - ${constants.appBarHeight}px);
  position: relative;
`
const LoginContainer = styled.div`
  margin: 20px;
`

const VermehrungIndex = () => {
  const { pathname } = useLocation()
  const store = useContext(StoreContext)
  const {
    gettingAuthUser,
    authorizing,
    initialDataQueried,
    initiallyQuerying,
    showQueuedQueries,
    user,
    online,
    gqlClient,
    addNotification,
  } = store
  const { setLastActiveNodeArray, setOpenNodes, wsReconnectCount } = store.tree

  const existsUser = !!user?.uid

  const activeNodeArray = activeNodeArrayFromPathname(pathname)

  // on first render set openNodes
  // DO NOT add activeNodeArray to useEffet's dependency array or
  // it will not be possible to open multiple branches in tree
  // as openNodes is overwritten every time activeNodeArray changes
  useEffect(() => {
    setOpenNodes(openNodesFromActiveNodeArray(activeNodeArray))
    // set last touched node in case project is directly opened on it
    setLastActiveNodeArray(activeNodeArray)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

  if (!existsUser && !gettingAuthUser) {
    return (
      <ErrorBoundary>
        <LoginContainer>
          <Login />
        </LoginContainer>
      </ErrorBoundary>
    )
  }

  if (online && !initialDataQueried) {
    addNotification({
      message: `lade Daten für offline-Nutzung (${tableNames(
        initiallyQuerying,
      )})`,
      type: 'info',
      duration: 2000,
    })
  }

  /*if (
    error &&
    !error.message.includes('Failed to fetch') &&
    !error.message.includes('JWT')
  ) {
    return (
      <ErrorBoundary>
        <Layout>
          <ErrorContainer>{error.message}</ErrorContainer>
        </Layout>
      </ErrorBoundary>
    )
  }
  if (error && error.message.includes('JWT')) {
    checkAuthOnError({ error, store })
  }*/
  if (showQueuedQueries) {
    return (
      <>
        <Container>
          <QueuedQueries />
        </Container>
        <ApiDetector />
      </>
    )
  }

  return (
    <ErrorBoundary>
      <StoragePersister />
      <AuthorizingObserver />
      <VermehrungComponent />
      <ApiDetector />
    </ErrorBoundary>
  )
}

export default observer(VermehrungIndex)
