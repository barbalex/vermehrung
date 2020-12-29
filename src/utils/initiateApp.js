import { SubscriptionClient } from 'subscriptions-transport-ws'
import { createClient } from 'urql'

import getConstants from './constants'
import MobxStore from '../store'
import getAuthToken from './getAuthToken'

const constants = getConstants()

const noToken =
  'eyJhbGciOiJIUzUxMiIsImtpZCI6IjRlMjdmNWIwNjllYWQ4ZjliZWYxZDE0Y2M2Mjc5YmRmYWYzNGM1MWIiLCJ0eXAiOiJKV1QifQ.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6Im5vbmUiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIm5vbmUiXSwieC1oYXN1cmEtdXNlci1pZCI6ImFhYWFhYWFhLWFhYWEtMTFlYS1hYWFhLWFhYWFhYWFhYWFhYSJ9LCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmVybWVocnVuZy1hYWFhYSIsImF1ZCI6InZlcm1laHJ1bmctZjQ4YzQiLCJhdXRoX3RpbWUiOjE1OTE5Njg3MzQsInVzZXJfaWQiOiJYUnV6eHAxWDJ3YWFhYWF5ek9hV1Y2emdhYWFhIiwic3ViIjoiWFJ1enhwMVhhYWFhb3l6T2FXVjZ6Z0NDTDIiLCJpYXQiOjE1OTE5NjkzNDksImV4cCI6MTU5MTk3Mjk0OSwiZW1haWwiOiJ0ZXN0QHRlc3QuY2giLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0._BWw-QO7K_oTr72pHZBl4OlXox3_x59IGEnllj3PwaFO8fylhQX7YZyaNev7iqeiyzx2DRZyAQyFhffNjEWyog'
const getToken = () => {
  if (typeof window === 'undefined') return noToken
  return window.localStorage.getItem('token') ?? noToken
}

const initiateApp = async () => {
  const store = MobxStore.create()
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
        connectionCallback: async (error) => {
          if (error) {
            console.log('gqlWsClient connectionCallback error:', error)
            if (error.message.toLowerCase().includes('jwt')) {
              await getAuthToken({ store })
              token = getToken()
              window.location.reload(true)
            }
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
    gqlWsClient.onDisconnected(() => {
      // TODO: react
      console.log('ws client disconnected')
      store.setShortTermOnline(false)
    })
    gqlWsClient.onReconnected(() => {
      console.log('ws client re-connected')
      store.setShortTermOnline(true)
    })
  }
  // need to renew header any time
  // solutions:
  // https://github.com/apollographql/subscriptions-transport-ws/issues/171#issuecomment-307793837

  store.setGqlWsClient(gqlWsClient)

  const gqlClient = createClient({
    url: constants?.graphQlUri,
    fetchOptions: () => {
      const token = getToken()
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      }
    },
  })
  store.setGqlClient(gqlClient)

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
