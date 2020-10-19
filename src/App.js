import React, { useEffect, useState } from 'react'
import 'isomorphic-fetch'
import { observer } from 'mobx-react-lite'

import { StoreContext } from './models'

import { MuiThemeProvider } from '@material-ui/core/styles'

import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

import 'simplebar/dist/simplebar.min.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Notifications from './components/Notifications'

// see: https://github.com/fontsource/fontsource/blob/master/packages/roboto
import 'fontsource-roboto-mono'
// see: https://github.com/fontsource/fontsource/tree/master/packages/roboto-mono
import 'fontsource-roboto'

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
        'Aktualisieren Sie ihn bitte für mehr Sicherheit, Geschwindigkeit und weil vermehrung.ch das voraussetzt.',
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
    let unregister
    initiateApp().then(
      ({ store: storeReturned, unregister: unregisterReturned }) => {
        setStore(storeReturned)
        unregister = unregisterReturned
      },
    )
    return () => {
      unregister()
    }
  }, [])

  // without store bad things happen
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
