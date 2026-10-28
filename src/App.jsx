import { useEffect, useState, Suspense } from 'react'
import DatabaseProvider from '@nozbe/watermelondb/react/DatabaseProvider'
import { useAtomValue } from 'jotai'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import { darkTheme, lightTheme } from './utils/materialTheme.js'
import { initiateApp } from './utils/initiateApp.js'
import { initiateDb } from './utils/initiateDb.js'
import { apiClientAtom, dbAtom, setDb, themeModeAtom } from './store/index.js'
import { Router } from './Router.jsx'
import { QueuedQueriesObserver } from './components/QueuedQueriesObserver.jsx'
import { version as appVersion } from '../package.json'

export const App = () => {
  const [initiated, setInitiated] = useState(false)
  const [initError, setInitError] = useState(null)
  const database = useAtomValue(dbAtom)
  const apiClient = useAtomValue(apiClientAtom)
  const themeMode = useAtomValue(themeModeAtom)

  // track the OS color-scheme preference so 'system' mode can follow it live
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches,
  )
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event) => setSystemPrefersDark(event.matches)
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  const isDark =
    themeMode === 'dark' || (themeMode === 'system' && systemPrefersDark)

  // mirror the resolved mode onto <html> so plain CSS (index.css, component
  // modules) can define dark variants via [data-theme='dark'];
  // index.html sets the same attribute before first paint
  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    // the uploadcare uploader picks its scheme from the OS otherwise
    document.documentElement.classList.toggle('uc-dark', isDark)
    document.documentElement.classList.toggle('uc-light', !isDark)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDark ? '#121212' : '#2e0c58')
  }, [isDark])

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
  if (!initiated || !database || !apiClient) return null

  return (
    <DatabaseProvider database={database}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <QueuedQueriesObserver />
          <Suspense fallback={null}>
            <Router />
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </DatabaseProvider>
  )
}
