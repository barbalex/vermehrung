import React, { useEffect, useState } from 'react'
import 'isomorphic-fetch'
import { observer } from 'mobx-react-lite'
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'

import { Provider as UrqlProvider } from 'urql'

import { MuiThemeProvider } from '@material-ui/core/styles'

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
    if (store && !database) {
      const db = initiateDb()
      setDatabase(db)
      store.setDb(db)
    }
  }, [store, database])

  useEffect(() => {
    let unregister
    initiateApp().then(
      ({ store: storeReturned, unregister: unregisterReturned }) => {
        setStore(storeReturned)
        unregister = unregisterReturned
      },
    )
    return () => unregister()
  }, [])

  // without store bad things happen
  if (!store || !database) return null

  return (
    <DatabaseProvider database={database}>
      <MuiThemeProvider theme={materialTheme}>
        <MobxProvider value={store}>
          <UrqlProvider value={store.gqlClient}>
            <GlobalStyle />
            {element}
            <Notifications />
          </UrqlProvider>
        </MobxProvider>
      </MuiThemeProvider>
    </DatabaseProvider>
  )
}

export default observer(App)
