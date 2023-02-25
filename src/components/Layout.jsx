import React, { useContext, useEffect, Suspense } from 'react'
import styled from '@emotion/styled'
import { withResizeDetector } from 'react-resize-detector'
import { Outlet } from 'react-router-dom'

import StoreContext from '../storeContext'
import constants from '../utils/constants'
import Fallback from './shared/Fallback'

import Header from './Header'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Layout = ({ width }) => {
  const store = useContext(StoreContext)
  const { singleColumnView, setSingleColumnView } = store

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

export default withResizeDetector(Layout)
