import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'

import ErrorBoundary from '../components/ErrorBoundary'
import Layout from '../components/Layout'
import materialTheme from '../utils/materialTheme'
import VermehrungCore from '../components/VermehrungCore'

const Vermehrung = props => (
  <MuiThemeProvider theme={materialTheme}>
    <ErrorBoundary>
      <Layout>
        <VermehrungCore {...props} />
      </Layout>
    </ErrorBoundary>
  </MuiThemeProvider>
)
export default Vermehrung
