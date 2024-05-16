import React, { useContext, useEffect, Suspense } from 'react'
import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'

import StoreContext from '../storeContext.js'
import constants from '../utils/constants'
import Fallback from './shared/Fallback'

import Header from './Header'

const Container = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
`

const Layout = () => {
  const store = useContext(StoreContext)
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
    </Container>
  )
}

export default Layout
