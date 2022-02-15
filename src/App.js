import React, { useEffect, useState } from 'react'
import 'isomorphic-fetch'
import { observer } from 'mobx-react-lite'
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'

import { Provider as UrqlProvider } from 'urql'

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

import 'simplebar/dist/simplebar.min.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Notifications from './components/Notifications'

// see: https://github.com/fontsource/fontsource/blob/master/packages/roboto
import '@fontsource/roboto-mono'
import '@fontsource/roboto-mono/700.css'
// see: https://github.com/fontsource/fontsource/tree/master/packages/roboto-mono
import '@fontsource/roboto'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import materialTheme from './utils/materialTheme'

import createGlobalStyle from './utils/createGlobalStyle'
const GlobalStyle = createGlobalStyle()

import { Provider as MobxProvider } from './storeContext'

import initiateApp from './utils/initiateApp'
import initiateDb from './utils/initiateDb'

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
  const [database, setDatabase] = useState(null)

  useEffect(() => {
    let isActive = true
    let unregister
    initiateApp().then(
      ({ store: storeReturned, unregister: unregisterReturned }) => {
        if (!isActive) return

        setStore(storeReturned)
        unregister = unregisterReturned
        const db = initiateDb(store)
        setDatabase(db)
        storeReturned.setDb(db)
      },
    )

    return () => {
      isActive = false
      unregister()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // without store bad things happen
  if (!store || !database) return null

  return (
    <DatabaseProvider database={database}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={materialTheme}>
          <MobxProvider value={store}>
            <UrqlProvider value={store.gqlClient}>
              <GlobalStyle />
              {element}
              <Notifications />
            </UrqlProvider>
          </MobxProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </DatabaseProvider>
  )
}

export default observer(App)
