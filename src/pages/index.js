import React from 'react'
import { graphql } from 'gatsby'

import AuthorList from '../components/AuthorList'

const Index = ({ data }) => (
  <div>
    <h1>My Persons</h1>
    <AuthorList authors={data.hasura.person} />
  </div>
)

export default Index

export const query = graphql`
  query AuthorQuery {
    hasura {
      person {
        id
        name
      }
    }
  }
`
