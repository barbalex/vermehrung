import { useEffect, useState, Suspense } from 'react'
import DatabaseProvider from '@nozbe/watermelondb/react/DatabaseProvider'
import { useNavigate } from 'react-router-dom'

import { Provider as UrqlProvider } from 'urql'

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import { Routes, Route } from 'react-router-dom'

import Notifications from './components/Notifications/index.jsx'

import materialTheme from './utils/materialTheme.js'

import GlobalStyle from './components/GlobalStyle.jsx'

import { Provider as MobxProvider } from './storeContext.js'

import initiateApp from './utils/initiateApp.js'
import initiateDb from './utils/initiateDb.js'

import Home from './routes/index.jsx'
import VermehrungIndex from './routes/Vermehrung/index.jsx'
import FourOhFour from './routes/404.jsx'
import NavigationSyncController from './components/NavigationSyncController.tsx'
import Layout from './components/Layout.jsx'
import Docs from './components/Documentation/index.jsx'

import Ziele from './components/Documentation/docs/Ziele.jsx'
import ZieleHerkuenfte from './components/Documentation/docs/ZieleHerkuenfte.jsx'
import Herkuenfte from './components/Documentation/docs/Herkuenfte.jsx'
import TechnischeVoraussetzungen from './components/Documentation/docs/TechnischeVoraussetzungen.jsx'
import ZeitachseFuerArten from './components/Documentation/docs/ZeitachseFuerArten.jsx'
import ZeitachseFuerKulturen from './components/Documentation/docs/ZeitachseFuerKulturen.jsx'
import Sammlungen from './components/Documentation/docs/Sammlungen.jsx'
import Kulturen from './components/Documentation/docs/Kulturen.jsx'
import { Zaehlungen } from './components/Documentation/docs/Zaehlungen.jsx'
import { Teilkulturen } from './components/Documentation/docs/Teilkulturen/index.jsx'
import { Lieferungen } from './components/Documentation/docs/Lieferungen.jsx'
import { SammelLieferungen } from './components/Documentation/docs/SammelLieferungen.jsx'
import { Events } from './components/Documentation/docs/Events.jsx'
import { FelderBlenden } from './components/Documentation/docs/FelderBlenden/index.jsx'
import { OrdnerBlenden } from './components/Documentation/docs/OrdnerBlenden.jsx'
import { Planen } from './components/Documentation/docs/Planen.jsx'
import { GenetischeVielfalt } from './components/Documentation/docs/GenetischeVielfalt.jsx'
import { QualitaetsKontrollen } from './components/Documentation/docs/QualitatesKontrollen.jsx'
import { VermehrungErinnertSich } from './components/Documentation/docs/VermehrungErinnertSich.jsx'
import { OpenSource } from './components/Documentation/docs/OpenSource.jsx'
import { FehlerMelden } from './components/Documentation/docs/FehlerMelden.jsx'
import { Schnittstellen } from './components/Documentation/docs/Schnittstellen.jsx'
import { Pwa } from './components/Documentation/docs/Pwa/index.jsx'
import { Offline } from './components/Documentation/docs/Offline/index.jsx'
import { OfflineWie } from './components/Documentation/docs/OfflineWie.jsx'
import { History } from './components/Documentation/docs/History/index.jsx'
import { Technologien } from './components/Documentation/docs/Technologien.jsx'
import { Struktur } from './components/Documentation/docs/Struktur/index.jsx'
import { Roadmap } from './components/Documentation/docs/Roadmap.jsx'
import { Konten } from './components/Documentation/docs/Konten.jsx'
import { Datenschutz } from './components/Documentation/docs/Datenschutz.jsx'
import { Vermehrung } from './routes/Vermehrung/Vermehrung.jsx'
import { QueuedQueries } from './components/QueuedQueries/index.jsx'

const App = () => {
  const navigate = useNavigate()

  const [store, setStore] = useState(null)
  const [database, setDatabase] = useState(null)

  // console.log('App rendering')

  // TODO: move this to the Vermehrung route as in vermehrung_vite
  useEffect(() => {
    let isActive = true
    let unregister
    // console.log('App initiating')
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
                  <Route
                    path="/"
                    element={<Home />}
                  />
                  <Route
                    path="/Vermehrung/*"
                    element={<VermehrungIndex />}
                  >
                    <Route
                      path="*"
                      element={<Vermehrung />}
                    />
                    <Route
                      path="ausstehende-Operationen"
                      element={<QueuedQueries />}
                    />
                  </Route>
                  <Route
                    path="Dokumentation"
                    element={<Docs />}
                  >
                    <Route path="ziele">
                      <Route
                        index
                        element={<Ziele />}
                      />
                      <Route
                        path="herkuenfte"
                        element={<ZieleHerkuenfte />}
                      />
                    </Route>
                    <Route
                      path="technische-voraussetzungen"
                      element={<TechnischeVoraussetzungen />}
                    />
                    <Route
                      path="zeitachse-art"
                      element={<ZeitachseFuerArten />}
                    />
                    <Route
                      path="zeitachse-kultur"
                      element={<ZeitachseFuerKulturen />}
                    />
                    <Route
                      path="herkuenfte"
                      element={<Herkuenfte />}
                    />
                    <Route
                      path="sammlungen"
                      element={<Sammlungen />}
                    />
                    <Route
                      path="kulturen"
                      element={<Kulturen />}
                    />
                    <Route
                      path="zaehlungen"
                      element={<Zaehlungen />}
                    />
                    <Route
                      path="teilkulturen"
                      element={<Teilkulturen />}
                    />
                    <Route
                      path="lieferungen"
                      element={<Lieferungen />}
                    />
                    <Route
                      path="sammel-lieferungen"
                      element={<SammelLieferungen />}
                    />
                    <Route
                      path="events"
                      element={<Events />}
                    />
                    <Route
                      path="felder-blenden"
                      element={<FelderBlenden />}
                    />
                    <Route
                      path="ordner-blenden"
                      element={<OrdnerBlenden />}
                    />
                    <Route
                      path="planen"
                      element={<Planen />}
                    />
                    <Route
                      path="genetische-vielfalt"
                      element={<GenetischeVielfalt />}
                    />
                    <Route
                      path="qualitaets-kontrollen"
                      element={<QualitaetsKontrollen />}
                    />
                    <Route
                      path="gedaechtnis"
                      element={<VermehrungErinnertSich />}
                    />
                    <Route
                      path="open-source"
                      element={<OpenSource />}
                    />
                    <Route
                      path="fehler-ideen"
                      element={<FehlerMelden />}
                    />
                    <Route
                      path="schnittstellen"
                      element={<Schnittstellen />}
                    />
                    <Route
                      path="pwa"
                      element={<Pwa />}
                    />
                    <Route
                      path="offline"
                      element={<Offline />}
                    />
                    <Route
                      path="offline-wie"
                      element={<OfflineWie />}
                    />
                    <Route
                      path="historisierung"
                      element={<History />}
                    />
                    <Route
                      path="technologien"
                      element={<Technologien />}
                    />
                    <Route
                      path="struktur"
                      element={<Struktur />}
                    />
                    <Route
                      path="roadmap"
                      element={<Roadmap />}
                    />
                    <Route
                      path="konten"
                      element={<Konten />}
                    />
                    <Route
                      path="datenschutz"
                      element={<Datenschutz />}
                    />
                  </Route>
                  <Route
                    path="*"
                    element={<FourOhFour />}
                  />
                </Route>
              </Routes>
              <Suspense fallback={null}>
                <NavigationSyncController />
                <Notifications />
              </Suspense>
            </UrqlProvider>
          </MobxProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </DatabaseProvider>
  )
}

export default App
