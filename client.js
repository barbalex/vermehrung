import { ApolloClient } from 'apollo-client'
import { BatchHttpLink } from 'apollo-link-batch-http'
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
  const batchHttpLink = new BatchHttpLink({ uri: constants.graphQlUri })
  return new ApolloClient({
    link: ApolloLink.from([authLink, batchHttpLink]),
    cache,
    defaultOptions: { fetchPolicy: 'cache-and-network' },
  })
}

export default client
