import { createHttpClient } from 'mst-gql'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { createClient } from 'urql'

import getConstants from './constants'
import MobxStore from '../store'

const constants = getConstants()

const noToken =
  'eyJhbGciOiJIUzUxMiIsImtpZCI6IjRlMjdmNWIwNjllYWQ4ZjliZWYxZDE0Y2M2Mjc5YmRmYWYzNGM1MWIiLCJ0eXAiOiJKV1QifQ.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6Im5vbmUiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIm5vbmUiXSwieC1oYXN1cmEtdXNlci1pZCI6ImFhYWFhYWFhLWFhYWEtMTFlYS1hYWFhLWFhYWFhYWFhYWFhYSJ9LCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmVybWVocnVuZy1hYWFhYSIsImF1ZCI6InZlcm1laHJ1bmctZjQ4YzQiLCJhdXRoX3RpbWUiOjE1OTE5Njg3MzQsInVzZXJfaWQiOiJYUnV6eHAxWDJ3YWFhYWF5ek9hV1Y2emdhYWFhIiwic3ViIjoiWFJ1enhwMVhhYWFhb3l6T2FXVjZ6Z0NDTDIiLCJpYXQiOjE1OTE5NjkzNDksImV4cCI6MTU5MTk3Mjk0OSwiZW1haWwiOiJ0ZXN0QHRlc3QuY2giLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0._BWw-QO7K_oTr72pHZBl4OlXox3_x59IGEnllj3PwaFO8fylhQX7YZyaNev7iqeiyzx2DRZyAQyFhffNjEWyog'
const getToken = () => {
  if (typeof window === 'undefined') return noToken
  return window.localStorage.getItem('token') ?? noToken
}

const initiateApp = async () => {
  // https://github.com/mobxjs/mst-gql/issues/247
  //const gqlHttpClient = createHttpClient(constants?.graphQlUri)
  const gqlHttpClient = (() => {
    const client = createHttpClient(constants?.graphQlUri)
    client.setHeaders({ authorization: `Bearer ${getToken()}` })
    return client
  })()

  // ws client only works in the browser
  // need to prevent gatsby from executing it server side
  // see: https://github.com/apollographql/subscriptions-transport-ws/issues/333#issuecomment-359261024
  let gqlWsClient
  let token
  if (typeof window !== 'undefined') {
    // https://www.npmjs.com/package/subscriptions-transport-ws#hybrid-websocket-transport
    gqlWsClient = (() => {
      token = getToken()

      //console.log('initiateApp, wsClient setting token:', token)

      return new SubscriptionClient(constants?.graphQlWsUri, {
        reconnect: true,
        lazy: true,
        connectionCallback: (error) => {
          if (error) {
            console.log('gqlWsClient connectionCallback:', {
              error,
            })
            token = getToken()
          } else {
            console.log('gqlWsClient connectionCallback worked')
          }
        },
        connectionParams: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      })
    })()
    gqlWsClient.onConnected(() => console.log('ws client connected'))
    gqlWsClient.onDisconnected(() => console.log('ws client disconnected'))
    gqlWsClient.onReconnected(() => console.log('ws client re-connected'))
  }
  // need to renew header any time
  // solutions:
  // https://github.com/apollographql/subscriptions-transport-ws/issues/171#issuecomment-307793837

  const store = MobxStore.create()
  store.setGqlHttpClient(gqlHttpClient)
  store.setGqlWsClient(gqlWsClient)

  const rawQglClient = createClient({
    url: constants?.graphQlUri,
    fetchOptions: () => {
      const token = getToken()
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      }
    },
  })
  store.setRawQglClient(rawQglClient)

  if (typeof window === 'undefined') return store
  const module = await import('./recreatePersistedStore')
  const recreatePersistedStore = module.default
  const unregisterAuthObserver = await recreatePersistedStore({ store })
  const unregister = () => {
    unregisterAuthObserver()
  }

  return { store, unregister }
}

export default initiateApp
