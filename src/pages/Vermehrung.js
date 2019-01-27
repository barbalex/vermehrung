import React from 'react'

import ErrorBoundary from '../components/ErrorBoundary'
import Layout from '../components/Layout'
import VermehrungCore from '../components/VermehrungCore'

const Vermehrung = props => (
  <ErrorBoundary>
    <Layout>
      <VermehrungCore {...props} />
    </Layout>
  </ErrorBoundary>
)
export default Vermehrung
