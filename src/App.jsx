import { useEffect, useState, Suspense, lazy } from 'react'
import DatabaseProvider from '@nozbe/watermelondb/react/DatabaseProvider'
import { useNavigate } from 'react-router'

import { Provider as UrqlProvider } from 'urql'

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import { Routes, Route } from 'react-router'

import Notifications from './components/Notifications/index.jsx'

import materialTheme from './utils/materialTheme.js'

import GlobalStyle from './components/GlobalStyle.jsx'

import { Provider as MobxProvider } from './mobxStoreContext.js'

import initiateApp from './utils/initiateApp.js'
import initiateDb from './utils/initiateDb.js'

// TODO: lazy import all routes
const Home = lazy(async () => ({
  default: (await import('./routes/index.jsx')).Home,
}))
const VermehrungIndex = lazy(async () => ({
  default: (await import('./routes/Vermehrung/index.jsx')).VermehrungIndex,
}))
const FourOhFour = lazy(async () => ({
  default: (await import('./routes/404.jsx')).FourOhFour,
}))
const NavigationSyncController = lazy(async () => ({
  default: (await import('./components/NavigationSyncController.tsx'))
    .NavigationSyncController,
}))
const Layout = lazy(async () => ({
  default: (await import('./components/Layout.jsx')).Layout,
}))
const Documentation = lazy(async () => ({
  default: (await import('./components/Documentation/index.jsx')).Documentation,
}))
const Ziele = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Ziele.jsx')).Ziele,
}))
const ZieleHerkuenfte = lazy(async () => ({
  default: (await import('./components/Documentation/docs/ZieleHerkuenfte.jsx'))
    .ZieleHerkuenfte,
}))
const Herkuenfte = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Herkuenfte.jsx'))
    .Herkuenfte,
}))
const TechnischeVoraussetzungen = lazy(async () => ({
  default: (
    await import(
      './components/Documentation/docs/TechnischeVoraussetzungen.jsx'
    )
  ).TechnischeVoraussetzungen,
}))
const ZeitachseFuerArten = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/ZeitachseFuerArten.jsx')
  ).ZeitachseFuerArten,
}))
const ZeitachseFuerKulturen = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/ZeitachseFuerKulturen.jsx')
  ).ZeitachseFuerKulturen,
}))
const Sammlungen = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Sammlungen.jsx'))
    .Sammlungen,
}))
const Kulturen = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Kulturen.jsx'))
    .Kulturen,
}))
const Zaehlungen = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Zaehlungen.jsx'))
    .Zaehlungen,
}))
const Teilkulturen = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/Teilkulturen/index.jsx')
  ).Teilkulturen,
}))
const Lieferungen = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Lieferungen.jsx'))
    .Lieferungen,
}))
const SammelLieferungen = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/SammelLieferungen.jsx')
  ).SammelLieferungen,
}))
const Events = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Events.jsx')).Events,
}))
const FelderBlenden = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/FelderBlenden/index.jsx')
  ).FelderBlenden,
}))
const OrdnerBlenden = lazy(async () => ({
  default: (await import('./components/Documentation/docs/OrdnerBlenden.jsx'))
    .OrdnerBlenden,
}))
const Planen = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Planen.jsx')).Planen,
}))
const GenetischeVielfalt = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/GenetischeVielfalt.jsx')
  ).GenetischeVielfalt,
}))
const QualitaetsKontrollen = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/QualitatesKontrollen.jsx')
  ).QualitaetsKontrollen,
}))
const VermehrungErinnertSich = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/VermehrungErinnertSich.jsx')
  ).VermehrungErinnertSich,
}))
const OpenSource = lazy(async () => ({
  default: (await import('./components/Documentation/docs/OpenSource.jsx'))
    .OpenSource,
}))
const FehlerMelden = lazy(async () => ({
  default: (await import('./components/Documentation/docs/FehlerMelden.jsx'))
    .FehlerMelden,
}))
const Schnittstellen = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Schnittstellen.jsx'))
    .Schnittstellen,
}))
const Pwa = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Pwa/index.jsx')).Pwa,
}))
const Offline = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Offline/index.jsx'))
    .Offline,
}))
const OfflineWie = lazy(async () => ({
  default: (await import('./components/Documentation/docs/OfflineWie.jsx'))
    .OfflineWie,
}))
const History = lazy(async () => ({
  default: (await import('./components/Documentation/docs/History/index.jsx'))
    .History,
}))
const Technologien = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Technologien.jsx'))
    .Technologien,
}))
const Struktur = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Struktur/index.jsx'))
    .Struktur,
}))
const Roadmap = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Roadmap.jsx'))
    .Roadmap,
}))
const Konten = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Konten.jsx')).Konten,
}))
const Datenschutz = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Datenschutz.jsx'))
    .Datenschutz,
}))
const Vermehrung = lazy(async () => ({
  default: (await import('./routes/Vermehrung/Vermehrung.jsx')).Vermehrung,
}))
const QueuedQueries = lazy(async () => ({
  default: (await import('./components/QueuedQueries/index.jsx')).QueuedQueries,
}))

const App = () => {
  const navigate = useNavigate()

  const [store, setStore] = useState(null)
  const [database, setDatabase] = useState(null)

  // console.log('App rendering')

  // TODO: move this to the Vermehrung route as in vermehrung_vite
  // but docs?
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
                    element={<Documentation />}
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
