/**
 * Cant move Helmet to App
 * because neither StaticQuery nor AppQuery
 * work there :-(
 */
import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './Header'

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
const htmlStyle = {
  overflow: 'hidden',
}

const Layout = ({ children }) => (
  <StaticQuery
    query={query}
    render={data => (
      <>
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
          <html lang="de" style={htmlStyle} />
        </Helmet>
        <Header />
        {children}
      </>
    )}
  />
)

export default Layout
