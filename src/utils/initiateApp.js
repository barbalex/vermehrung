import { createHttpClient } from 'mst-gql'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { RootStore } from '../models'
import constants from './constants'
import getAuthToken from './getAuthToken'

const getToken = () => {
  console.log('initiateApp, getToken running')
  const none =
    'eyJhbGciOiJIUzUxMiIsImtpZCI6IjRlMjdmNWIwNjllYWQ4ZjliZWYxZDE0Y2M2Mjc5YmRmYWYzNGM1MWIiLCJ0eXAiOiJKV1QifQ.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6Im1hbmFnZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIm1hbmFnZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImFhYWFhYWFhLWFhYWEtMTFlYS1hYWFhLWFhYWFhYWFhYWFhYSJ9LCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmVybWVocnVuZy1hYWFhYSIsImF1ZCI6InZlcm1laHJ1bmctZjQ4YzQiLCJhdXRoX3RpbWUiOjE1OTE5Njg3MzQsInVzZXJfaWQiOiJYUnV6eHAxWDJ3YWFhYWF5ek9hV1Y2emdhYWFhIiwic3ViIjoiWFJ1enhwMVhhYWFhb3l6T2FXVjZ6Z0NDTDIiLCJpYXQiOjE1OTE5NjkzNDksImV4cCI6MTU5MTk3Mjk0OSwiZW1haWwiOiJ0ZXN0QHRlc3QuY2giLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.AuCb49h4qCkT-bi-v31BtnkdYnCfzgy7KbVSMBNYmwrLx2KAhzvlSNl51QS5cy6MDzCe7hGGx2xb_EFbTZQwgA'
  if (typeof window === 'undefined') return none
  return window.localStorage.getItem('token') ?? none
}

export default async () => {
  // https://github.com/mobxjs/mst-gql/issues/247
  const gqlHttpClient = createHttpClient(constants.graphQlUri)

  // is this the place to use the last snapshot of the store instead of undefined?
  // to that instead of mst-persist?
  gqlHttpClient.setHeaders({ authorization: `Bearer ${getToken()}` })

  // ws client only works in the browser
  // need to prevent gatsby from executing it server side
  // see: https://github.com/apollographql/subscriptions-transport-ws/issues/333#issuecomment-359261024
  let gqlWsClient
  let storeOptions = {
    gqlHttpClient,
  }
  let store
  if (typeof window !== 'undefined') {
    // https://www.npmjs.com/package/subscriptions-transport-ws#hybrid-websocket-transport
    gqlWsClient = (() => {
      return new SubscriptionClient(constants.graphQlWsUri, {
        reconnect: true,
        lazy: true,
        connectionCallback: (error) => {
          if (error) {
            console.log('gqlWsClient connectionCallback, error:', error)
            if (!store.authorizing) getAuthToken({ store })
          }
        },
        connectionParams: {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        },
      })
    })()

    // https://github.com/mobxjs/mst-gql/blob/master/src/MSTGQLStore.ts#L42-L43
    storeOptions = {
      gqlHttpClient,
      gqlWsClient,
    }
  }
  // need to renew header any time
  // solutions:
  // https://github.com/apollographql/subscriptions-transport-ws/issues/171#issuecomment-307793837

  store = RootStore.create(undefined, storeOptions)
  store.setGqlHttpClient(gqlHttpClient)
  store.setGqlWsClient(gqlWsClient)
  store.setAuthorizing(true)

  console.log('initiateApp just created a store')

  if (typeof window === 'undefined') return store

  const module = await import('./recreatePersistedStore')
  const recreatePersistedStore = module.default
  const unregister = await recreatePersistedStore({ store })

  console.log('initiateApp just will return store')
  return store
}
