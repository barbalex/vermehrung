import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'

import constants from './src/utils/constants.json'
import secrets from './secrets.json'

const client = () => {
  const authLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      'X-Hasura-Access-Key': secrets.accessKey,
    },
  }))

  const cache = new InMemoryCache()
  // apollo-link-batch-http did not work
  const httpLink = new createHttpLink({ uri: constants.graphQlUri })
  return new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache,
    defaultOptions: { fetchPolicy: 'cache-and-network' },
  })
}

export default client
