import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
//import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'

import constants from './src/utils/constants.json'

const client = () => {
  /*const authLink = setContext(async (_, { headers }) => {
    //const user = getProfile()
    // add hasura claims to pass roles
    //const claims = user['https://hasura.io/jwt/claims']

    return {
      headers: {
        ...headers,
        'X-Hasura-Access-Key': process.env.HASURA_ACCESS_KEY,
        //...claims,
      },
    }
  })*/

  const cache = new InMemoryCache()
  // apollo-link-batch-http did not work
  const httpLink = new createHttpLink({ uri: constants.graphQlUri })
  return new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache,
    defaultOptions: { fetchPolicy: 'cache-and-network' },
  })
}

export default client
