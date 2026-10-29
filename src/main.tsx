import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { Provider } from 'jotai'
import { config as rxjsConfig } from 'rxjs'

// subscribers without an error handler (e.g. bare .subscribe(next)) make
// rxjs rethrow observable errors as uncaught exceptions - e.g. when
// findAndObserve hits a record missing locally (fresh browser before the
// initial sync, remotely deleted row). log instead: the subscription
// ends, components recover when their observable dependencies change
rxjsConfig.onUnhandledError = (error) => console.error(error)


import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import 'allotment/dist/style.css'
import './index.css'

import browserUpdate from 'browser-update'

import { App } from './App.tsx'
import { store } from './store/index.ts'
import { maybeWipeForIdMigration } from './utils/idMigration2026.ts'

// discard local data once for the uuidv7 id migration, before anything
// reads or creates the local database
await maybeWipeForIdMigration()

registerLocale('de', de)
setDefaultLocale('de')

// inform users of old browsers
browserUpdate({
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
})

// https://vite-plugin-pwa.netlify.app/guide/prompt-for-update.html#runtime
registerSW({ immediate: true })

// console.log('main running')

// dev aid: surface uncaught errors that would otherwise only appear
// in the console (React unmounts the whole tree on uncaught render errors)
if (import.meta.env.DEV) {
  const showError = (text: string) => {
    const div = document.createElement('div')
    div.id = 'dev-error-overlay'
    div.style.cssText =
      'position:fixed;top:0;left:0;right:0;z-index:99999;background:#b71c1c;color:#fff;padding:12px;font:13px/1.5 monospace;white-space:pre-wrap;max-height:60vh;overflow:auto'
    div.textContent = text
    document.body.appendChild(div)
  }
  window.addEventListener('error', (event) => {
    showError(`Uncaught error: ${event.message}\n${event.error?.stack ?? ''}`)
  })
  window.addEventListener('unhandledrejection', (event) => {
    showError(
      `Unhandled rejection: ${event.reason}\n${event.reason?.stack ?? ''}`,
    )
  })
}

const container = document.getElementById('root')
if (!container) throw new Error('root element not found')
const root = createRoot(container)

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
