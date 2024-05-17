import { useContext } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import StoreContext from '../../storeContext.js'
import Login from '../../components/Login.jsx'
import ErrorBoundary from '../../components/shared/ErrorBoundary.jsx'
import ApiDetector from '../../components/ApiDetector.jsx'
import QueuedQueries from '../../components/QueuedQueries/index.jsx'
import constants from '../../utils/constants.js'
import VermehrungComponent from './Vermehrung.jsx'
import AuthorizingObserver from './AuthorizingObserver.jsx'
import StoragePersister from './StoragePersister.jsx'
import OpenNodesSetter from './OpenNodesSetter.jsx'
import SubscriptionsInitializer from './SubscriptionsInitializer.jsx'
import InitialDataLoadingNotifier from './InitialDataLoadingNotifier.jsx'

const Container = styled.div`
  min-height: calc(100dvh - ${constants.appBarHeight}px);
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
