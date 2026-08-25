import { useEffect, useState, Suspense } from 'react'
import DatabaseProvider from '@nozbe/watermelondb/react/DatabaseProvider'
import { useAtomValue } from 'jotai'
import { Provider as UrqlProvider } from 'urql'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import { materialTheme } from './utils/materialTheme.js'
import { initiateApp } from './utils/initiateApp.js'
import { initiateDb } from './utils/initiateDb.js'
import { dbAtom, gqlClientAtom, setDb } from './store/index.js'
import { Router } from './Router.jsx'
import { QueuedQueriesObserver } from './components/QueuedQueriesObserver.jsx'
import { version as appVersion } from '../package.json'

export const App = () => {
  const [initiated, setInitiated] = useState(false)
  const [initError, setInitError] = useState(null)
  const database = useAtomValue(dbAtom)
  const gqlClient = useAtomValue(gqlClientAtom)

  useEffect(() => {
    const baseTitle = 'Vermehrung'
    document.title = `${baseTitle} ${appVersion}`
  }, [])

  // console.log('App rendering')

  // TODO: move this to the Vermehrung route as in vermehrung_vite
  // but docs?
  useEffect(() => {
    let isActive = true
    let unregister
    // console.log('App initiating')
    initiateApp()
      .then(({ unregister: unregisterReturned }) => {
        if (!isActive) return

        unregister = unregisterReturned
        const db = initiateDb()
        setDb(db)
        setInitiated(true)
        // console.log('App, effect after initating app', { db })
      })
      .catch((error) => {
        console.error('App initiating failed:', error)
        setInitError(String(error?.stack ?? error))
      })

    return () => {
      isActive = false
      unregister?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // without database and client bad things happen
  if (initError)
    return (
      <div style={{ padding: 20, color: 'red', whiteSpace: 'pre-wrap' }}>
        App konnte nicht gestartet werden: {initError}
      </div>
    )
  if (!initiated || !database || !gqlClient) return null

  return (
    <DatabaseProvider database={database}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={materialTheme}>
          <UrqlProvider value={gqlClient}>
            <QueuedQueriesObserver />
            <Suspense fallback={null}>
              <Router />
            </Suspense>
          </UrqlProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </DatabaseProvider>
  )
}
