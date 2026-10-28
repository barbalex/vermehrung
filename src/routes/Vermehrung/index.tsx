import { Outlet } from 'react-router'
import { useAtomValue } from 'jotai'

import { gettingAuthUserAtom, userAtom } from '../../store/index.ts'
import { Login } from '../../components/Login.tsx'
import { ErrorBoundary } from '../../components/shared/ErrorBoundary.tsx'
import { ApiDetector } from '../../components/ApiDetector.tsx'
import { AuthorizingObserver } from './AuthorizingObserver.tsx'
import { StoragePersister } from './StoragePersister.tsx'
import { OpenNodesSetter } from './OpenNodesSetter.tsx'
import { SubscriptionsInitializer } from './SubscriptionsInitializer.tsx'
import { InitialDataLoadingNotifier } from './InitialDataLoadingNotifier.tsx'

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
