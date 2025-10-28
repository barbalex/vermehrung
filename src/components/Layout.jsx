import { useContext, useEffect, Suspense, lazy } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { Outlet } from 'react-router'

import { MobxStoreContext } from '../mobxStoreContext.js'
import { constants } from '../utils/constants.js'
import { Fallback } from './shared/Fallback.jsx'

const NavigationSyncController = lazy(async () => ({
  default: (await import('./NavigationSyncController.tsx'))
    .NavigationSyncController,
}))
// TODO: import lazily
import { Notifications } from './Notifications/index.jsx'

import Header from './Header/index.jsx'

const Container = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
`

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
    <Container>
      <Header />
      <Suspense fallback={<Fallback />}>
        <Outlet />
      </Suspense>
      <Suspense fallback={null}>
        <NavigationSyncController />
        <Notifications />
      </Suspense>
    </Container>
  )
})
