import { useContext, lazy } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import StoreContext from '../../storeContext'
const Login = lazy(() => import('../../components/Login'))
const ErrorBoundary = lazy(() =>
  import('../../components/shared/ErrorBoundary'),
)
const ApiDetector = lazy(() => import('../../components/ApiDetector'))
const QueuedQueries = lazy(() => import('../../components/QueuedQueries'))
import constants from '../../utils/constants'
const VermehrungComponent = lazy(() => import('./Vermehrung'))
const AuthorizingObserver = lazy(() => import('./AuthorizingObserver'))
const StoragePersister = lazy(() => import('./StoragePersister'))
const OpenNodesSetter = lazy(() => import('./OpenNodesSetter'))
const SubscriptionsInitializer = lazy(() =>
  import('./SubscriptionsInitializer'),
)
const InitialDataLoadingNotifier = lazy(() =>
  import('./InitialDataLoadingNotifier'),
)

const Container = styled.div`
  min-height: calc(100vh - ${constants.appBarHeight}px);
  position: relative;
`
const LoginContainer = styled.div`
  margin: 20px;
`

const VermehrungIndex = () => {
  const store = useContext(StoreContext)
  const { gettingAuthUser, showQueuedQueries, user } = store

  const existsUser = !!user?.uid

  if (!existsUser && !gettingAuthUser) {
    return (
      <ErrorBoundary>
        <LoginContainer>
          <Login />
        </LoginContainer>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <InitialDataLoadingNotifier />
      <SubscriptionsInitializer />
      <OpenNodesSetter />
      <StoragePersister />
      <AuthorizingObserver />
      {showQueuedQueries ? (
        <Container>
          <QueuedQueries />
        </Container>
      ) : (
        <VermehrungComponent />
      )}
      <ApiDetector />
    </ErrorBoundary>
  )
}

export default observer(VermehrungIndex)
