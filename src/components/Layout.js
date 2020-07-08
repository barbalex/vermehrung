/**
 * Cant move Helmet to App
 * because neither StaticQuery nor AppQuery
 * work there :-(
 */
import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

import { StoreContext } from '../models/reactUtils'
import getConstants from '../utils/constants'

const constants = getConstants()

import Header from './Header'

const Container = styled.div`
  height: 100%;
  width: 100%;
`

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
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

  const data = useStaticQuery(query)

  return (
    <Container>
      <Helmet
        title={data.site.siteMetadata.title}
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
