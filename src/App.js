import React, { useEffect, useRef, useState } from 'react'
import 'isomorphic-fetch'
import 'mobx-react-lite/batchingForReactDom'
import { observer } from 'mobx-react-lite'

import { StoreContext } from './models'

import { MuiThemeProvider } from '@material-ui/core/styles'

import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import 'isomorphic-fetch'

import Notifications from './components/Notifications'

import materialTheme from './utils/materialTheme'

import createGlobalStyle from './utils/createGlobalStyle'
const GlobalStyle = createGlobalStyle()

import initiateApp from './utils/initiateApp'

registerLocale('de', de)
setDefaultLocale('de')

if (typeof window !== 'undefined') {
  // inform users of old browsers
  const browserUpdateConfiguration = {
    required: { e: -2, f: -2, o: -2, s: -2, c: -2 },
    text: {
      msg: 'Ihr Browser ({brow_name}) ist veraltet.',
      msgmore:
        'Aktualisieren Sie ihn für mehr Sicherheit, Geschwindigkeit und weil vermehrung.ch einen aktuellen Browser voraussetzt.',
      bupdate: 'Browser aktualisieren',
      bignore: 'Ignorieren',
    },
    style: 'bottom',
    //test: true,
  }
  import('browser-update').then((module) =>
    module.default(browserUpdateConfiguration),
  )
}

const App = ({ element }) => {
  const [store, setStore] = useState(null)

  useEffect(() => {
    console.log('app initiating app')
    initiateApp().then((newlyCreatedStore) => {
      console.log('App, newlyCreatedStore:', newlyCreatedStore)
      setStore(newlyCreatedStore)
    })
  }, [])

  useEffect(() => {
    if (!store) return
    const currentStore = store
    return () => {
      console.log('App, unregistering auth observer')
      currentStore.unregisterAuthObserver()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store])

  console.log('App rendering, store:', store)
  // necessary?
  if (!store) return null
  return (
    <MuiThemeProvider theme={materialTheme}>
      <StoreContext.Provider value={store}>
        <>
          <GlobalStyle />
          {element}
          <Notifications />
        </>
      </StoreContext.Provider>
    </MuiThemeProvider>
  )
}

export default observer(App)
