/**
 * Cant move Helmet to App
 * because neither StaticQuery nor AppQuery
 * work there :-(
 * BUT: could now as not using StaticQuery any more
 */
import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
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
      <Helmet
        title="Vermehrung v1.3.53"
        meta={[
          {
            name: 'description',
            content: 'Bedrohte Pflanzenarten vermehren',
          },
          {
            name: 'keywords',
            content: 'Naturschutz, Artenschutz, Flora, Pflanzen, Vermehrung',
          },
        ]}
      >
        <html lang="de" />
      </Helmet>
      <Header />
      {children}
    </Container>
  )
}

export default withResizeDetector(Layout)
