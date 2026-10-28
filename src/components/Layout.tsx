import { useEffect, Suspense, lazy } from 'react'
import { useAtomValue } from 'jotai'
import { Outlet } from 'react-router'

import { setSingleColumnView, singleColumnViewAtom } from '../store/index.ts'
import { constants } from '../utils/constants.ts'
import { Fallback } from './shared/Fallback.tsx'

const NavigationSyncController = lazy(async () => ({
  default: (await import('./NavigationSyncController.tsx'))
    .NavigationSyncController,
}))
const Notifications = lazy(async () => ({
  default: (await import('./Notifications/index.tsx')).Notifications,
}))

import Header from './Header/index.tsx'

import styles from './Layout.module.css'

export const Layout = () => {
  const singleColumnView = useAtomValue(singleColumnViewAtom)

  const width =
    window.innerWidth ??
    document.documentElement.clientWidth ??
    document.body.clientWidth

  useEffect(() => {
    if (width > constants?.tree?.minimalWindowWidth && singleColumnView) {
      setSingleColumnView(false)
    }
    if (width < constants?.tree?.minimalWindowWidth && !singleColumnView) {
      setSingleColumnView(true)
    }
  }, [singleColumnView, width])

  return (
    <div className={styles.container}>
      <Header />
      <Suspense fallback={<Fallback />}>
        <Outlet />
      </Suspense>
      <NavigationSyncController />
      <Notifications />
    </div>
  )
}
