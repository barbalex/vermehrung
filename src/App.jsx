import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import { useNavigate } from 'react-router-dom'

import { Provider as UrqlProvider } from 'urql'

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import { Routes, Route } from 'react-router-dom'

import Notifications from './components/Notifications'

import materialTheme from './utils/materialTheme'

import GlobalStyle from './components/GlobalStyle'

import { Provider as MobxProvider } from './storeContext'

import initiateApp from './utils/initiateApp'
import initiateDb from './utils/initiateDb'

import Home from './routes/index.jsx'
import VermehrungIndex from './routes/Vermehrung'
import FourOhFour from './routes/404'
import NavigationSyncController from './components/NavigationSyncController'
import Layout from './components/Layout'
import DocRoutes from './DocRoutes'
import Docs from './components/Documentation'

const App = () => {
  const navigate = useNavigate()

  const [store, setStore] = useState(null)
  const [database, setDatabase] = useState(null)

  console.log('App rendering')

  // TODO: move this to the Vermehrung route as in vermehrung_vite
  useEffect(() => {
    let isActive = true
    let unregister
    console.log('App initiating')
    initiateApp({ navigate }).then(
      ({ store: storeReturned, unregister: unregisterReturned }) => {
        if (!isActive) return

        setStore(storeReturned)
        unregister = unregisterReturned
        const db = initiateDb(store)
        setDatabase(db)
        storeReturned.setDb(db)
        // console.log('App, effect after initating app', { db, storeReturned })
      },
    )

    return () => {
      isActive = false
      unregister?.()
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
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/Vermehrung/*" element={<VermehrungIndex />} />
                  <Route path="/Dokumentation/*" element={<Docs />}>
                    {DocRoutes()}
                  </Route>
                  <Route path="*" element={<FourOhFour />} />
                </Route>
              </Routes>
              <NavigationSyncController />
              <Notifications />
            </UrqlProvider>
          </MobxProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </DatabaseProvider>
  )
}

export default observer(App)
