import { Outlet } from 'react-router'
import { useAtomValue } from 'jotai'

import { gettingAuthUserAtom, userAtom } from '../../store/index.js'
import { Login } from '../../components/Login.jsx'
import { ErrorBoundary } from '../../components/shared/ErrorBoundary.jsx'
import { ApiDetector } from '../../components/ApiDetector.jsx'
import { constants } from '../../utils/constants.js'
import { AuthorizingObserver } from './AuthorizingObserver.jsx'
import { StoragePersister } from './StoragePersister.jsx'
import { OpenNodesSetter } from './OpenNodesSetter.jsx'
import { SubscriptionsInitializer } from './SubscriptionsInitializer.jsx'
import { InitialDataLoadingNotifier } from './InitialDataLoadingNotifier.jsx'

export const VermehrungIndex = () => {
  const gettingAuthUser = useAtomValue(gettingAuthUserAtom)
  const user = useAtomValue(userAtom)

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
      <ApiDetector />
      <Outlet />
    </ErrorBoundary>
  )
}
