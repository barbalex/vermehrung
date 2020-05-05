/**
 * Can't use offix-client because of it's use of window
 * https://github.com/aerogear/offix/issues/446
 */
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'

import constants from './src/utils/constants.json'

const client = async () => {
  const authLink = setContext(async (_, { headers }) => {
    // get token every time from localStorage
    // see: https://www.apollographql.com/docs/react/networking/authentication/#header
    const token = localStorage.getItem('token')
    const newHeaders = token
      ? {
          headers: {
            ...headers,
            //'X-Hasura-Access-Key': process.env.HASURA_ACCESS_KEY,
            authorization: token ? `Bearer ${token}` : '',
          },
        }
      : {
          headers: {
            ...headers,
          },
        }

    return newHeaders
  })

  let Client
  if (typeof window !== 'undefined') {
    console.log('using offix-client')
    const cl = await import('offix-client')
    Client = cl.ApolloOfflineClient
  } else {
    console.log('using apollo-client')
    const cl = await import('apollo-client')
    Client = cl.ApolloClient
  }

  const cache = new InMemoryCache()
  // apollo-link-batch-http did not work
  const httpLink = new createHttpLink({ uri: constants.graphQlUri })
  return new Client({
    link: ApolloLink.from([authLink, httpLink]),
    cache,
    defaultOptions: { fetchPolicy: 'cache-and-network' },
  })
}

export default client
