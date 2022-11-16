import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

import StoreContext from '../storeContext'
import constants from '../utils/constants'

import Header from './Header'

const Container = styled.div`
  height: 100%;
  width: 100%;
`

const Layout = ({ children, width }) => {
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
      {children}
    </Container>
  )
}

export default withResizeDetector(Layout)
