import { useContext, useEffect, Suspense, lazy } from 'react'
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router'

import { MobxStoreContext } from '../mobxStoreContext.js'
import { constants } from '../utils/constants.js'
import { Fallback } from './shared/Fallback.jsx'

const NavigationSyncController = lazy(async () => ({
  default: (await import('./NavigationSyncController.tsx'))
    .NavigationSyncController,
}))
const Notifications = lazy(async () => ({
  default: (await import('./Notifications/index.jsx')).Notifications,
}))

import Header from './Header/index.jsx'

import { container } from './Layout.module.css'

export const Layout = observer(() => {
  const store = useContext(MobxStoreContext)
  const { singleColumnView, setSingleColumnView } = store

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
  }, [setSingleColumnView, singleColumnView, width])

  return (
    <div className={container}>
      <Header />
      <Suspense fallback={<Fallback />}>
        <Outlet />
      </Suspense>
      <NavigationSyncController />
      <Notifications />
    </div>
  )
})
