import { useContext } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import StoreContext from '../../storeContext'
import Login from '../../components/Login'
import ErrorBoundary from '../../components/shared/ErrorBoundary'
import ApiDetector from '../../components/ApiDetector'
import QueuedQueries from '../../components/QueuedQueries'
import constants from '../../utils/constants'
import VermehrungComponent from './Vermehrung'
import AuthorizingObserver from './AuthorizingObserver'
import StoragePersister from './StoragePersister'
import OpenNodesSetter from './OpenNodesSetter'
import SubscriptionsInitializer from './SubscriptionsInitializer'
import InitialDataLoadingNotifier from './InitialDataLoadingNotifier'

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
