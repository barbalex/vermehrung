import React from 'react'
import { graphql } from 'gatsby'

import AuthorList from '../../components/AuthorList'
import ErrorBoundary from '../../components/ErrorBoundary'
import Layout from '../../components/Layout'

const Index = ({ data }) => (
  <ErrorBoundary>
    <Layout>
      <div>
        <h1>Vermehrung</h1>
        <AuthorList authors={data.hasura.person} />
      </div>
    </Layout>
  </ErrorBoundary>
)

export default Index

export const query = graphql`
  query VermehrungQuery {
    hasura {
      person {
        id
        name
      }
    }
  }
`
