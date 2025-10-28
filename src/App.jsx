import { useEffect, useState, Suspense } from 'react'
import DatabaseProvider from '@nozbe/watermelondb/react/DatabaseProvider'

import { Provider as UrqlProvider } from 'urql'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { materialTheme } from './utils/materialTheme.js'
import { GlobalStyle } from './components/GlobalStyle.jsx'
import { MobxStoreProvider } from './mobxStoreContext.js'
import { initiateApp } from './utils/initiateApp.js'
import { initiateDb } from './utils/initiateDb.js'
import { Router } from './Router.jsx'

export const App = () => {
  const [store, setStore] = useState(null)
  const [database, setDatabase] = useState(null)

  // console.log('App rendering')

  // TODO: move this to the Vermehrung route as in vermehrung_vite
  // but docs?
  useEffect(() => {
    let isActive = true
    let unregister
    // console.log('App initiating')
    initiateApp().then(
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
          <MobxStoreProvider value={store}>
            <UrqlProvider value={store.gqlClient}>
              <GlobalStyle />
              <Suspense fallback={null}>
                <Router />
              </Suspense>
            </UrqlProvider>
          </MobxStoreProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </DatabaseProvider>
  )
}
