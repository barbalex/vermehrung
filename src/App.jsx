import { useEffect, useState, Suspense } from 'react'
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
import Docs from './components/Documentation'

import Ziele from './components/Documentation/docs/Ziele'
import ZieleHerkuenfte from './components/Documentation/docs/ZieleHerkuenfte'
import Herkuenfte from './components/Documentation/docs/Herkuenfte'
import TechnischeVoraussetzungen from './components/Documentation/docs/TechnischeVoraussetzungen'
import ZeitachseFuerArten from './components/Documentation/docs/ZeitachseFuerArten'
import ZeitachseFuerKulturen from './components/Documentation/docs/ZeitachseFuerKulturen'
import Sammlungen from './components/Documentation/docs/Sammlungen'
import Kulturen from './components/Documentation/docs/Kulturen'
import Zaehlungen from './components/Documentation/docs/Zaehlungen'
import Teilkulturen from './components/Documentation/docs/Teilkulturen'
import Lieferungen from './components/Documentation/docs/Lieferungen'
import SammelLieferungen from './components/Documentation/docs/SammelLieferungen'
import Events from './components/Documentation/docs/Events'
import FelderBlenden from './components/Documentation/docs/FelderBlenden'
import OrdnerBlenden from './components/Documentation/docs/OrdnerBlenden'
import Planen from './components/Documentation/docs/Planen'
import GenetischeVielfalt from './components/Documentation/docs/GenetischeVielfalt'
import QualitaetsKontrollen from './components/Documentation/docs/QualitatesKontrollen'
import VermehrungErinnertSich from './components/Documentation/docs/VermehrungErinnertSich'
import OpenSource from './components/Documentation/docs/OpenSource'
import FehlerMelden from './components/Documentation/docs/FehlerMelden'
import Schnittstellen from './components/Documentation/docs/Schnittstellen'
import Pwa from './components/Documentation/docs/Pwa'
import Offline from './components/Documentation/docs/Offline'
import OfflineWie from './components/Documentation/docs/OfflineWie'
import History from './components/Documentation/docs/History'
import Technologien from './components/Documentation/docs/Technologien'
import Struktur from './components/Documentation/docs/Struktur'
import Roadmap from './components/Documentation/docs/Roadmap'
import Konten from './components/Documentation/docs/Konten'
import Datenschutz from './components/Documentation/docs/Datenschutz'

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
                  <Route path="/" element={<Home />} />
                  <Route path="/Vermehrung/*" element={<VermehrungIndex />} />
                  <Route path="/Dokumentation/*" element={<Docs />}>
                    <Route path="ziele" element={<Ziele />} />
                    <Route
                      path="ziele/herkuenfte"
                      element={<ZieleHerkuenfte />}
                    />
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
                    <Route path="herkuenfte" element={<Herkuenfte />} />
                    <Route path="sammlungen" element={<Sammlungen />} />
                    <Route path="kulturen" element={<Kulturen />} />
                    <Route path="zaehlungen" element={<Zaehlungen />} />
                    <Route path="teilkulturen" element={<Teilkulturen />} />
                    <Route path="lieferungen" element={<Lieferungen />} />
                    <Route
                      path="sammel-lieferungen"
                      element={<SammelLieferungen />}
                    />
                    <Route path="events" element={<Events />} />
                    <Route path="felder-blenden" element={<FelderBlenden />} />
                    <Route path="ordner-blenden" element={<OrdnerBlenden />} />
                    <Route path="planen" element={<Planen />} />
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
                    <Route path="open-source" element={<OpenSource />} />
                    <Route path="fehler-ideen" element={<FehlerMelden />} />
                    <Route path="schnittstellen" element={<Schnittstellen />} />
                    <Route path="pwa" element={<Pwa />} />
                    <Route path="offline" element={<Offline />} />
                    <Route path="offline-wie" element={<OfflineWie />} />
                    <Route path="historisierung" element={<History />} />
                    <Route path="technologien" element={<Technologien />} />
                    <Route path="struktur" element={<Struktur />} />
                    <Route path="roadmap" element={<Roadmap />} />
                    <Route path="konten" element={<Konten />} />
                    <Route path="datenschutz" element={<Datenschutz />} />
                  </Route>
                  <Route path="*" element={<FourOhFour />} />
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

export default observer(App)
