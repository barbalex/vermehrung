import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { BrowserRouter } from 'react-router'

import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import 'allotment/dist/style.css'
import './index.css'

import browserUpdate from 'browser-update'

// see: https://github.com/fontsource/fontsource/blob/master/packages/roboto
import '@fontsource/roboto-mono'
import '@fontsource/roboto-mono/700.css'
// see: https://github.com/fontsource/fontsource/tree/master/packages/roboto-mono
import '@fontsource/roboto'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { App } from './App.jsx'

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

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter
    future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}
  >
    <App />
  </BrowserRouter>,
)
