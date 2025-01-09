import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router'

import { MobxStoreContext } from '../../mobxStoreContext.js'
import Login from '../../components/Login.jsx'
import ErrorBoundary from '../../components/shared/ErrorBoundary.jsx'
import ApiDetector from '../../components/ApiDetector.jsx'
import { QueuedQueries } from '../../components/QueuedQueries/index.jsx'
import constants from '../../utils/constants.js'
import AuthorizingObserver from './AuthorizingObserver.jsx'
import StoragePersister from './StoragePersister.jsx'
import { OpenNodesSetter } from './OpenNodesSetter.jsx'
import { SubscriptionsInitializer } from './SubscriptionsInitializer.jsx'
import { InitialDataLoadingNotifier } from './InitialDataLoadingNotifier.jsx'

export const VermehrungIndex = observer(() => {
  const store = useContext(MobxStoreContext)
  const { gettingAuthUser, user } = store

  const existsUser = !!user?.uid
  const returnLogin = !existsUser && !gettingAuthUser

  if (returnLogin) return <Login />

  return (
    <ErrorBoundary>
      <InitialDataLoadingNotifier />
      <SubscriptionsInitializer />
      <OpenNodesSetter />
      <StoragePersister />
      <AuthorizingObserver />
      <Outlet />
      <ApiDetector />
    </ErrorBoundary>
  )
})
