import { lazy } from 'react'
import { Route } from 'react-router-dom'

const Ziele = lazy(() => import('./components/Documentation/docs/Ziele'))
const ZieleHerkuenfte = lazy(() =>
  import('./components/Documentation/docs/ZieleHerkuenfte'),
)
const Herkuenfte = lazy(() =>
  import('./components/Documentation/docs/Herkuenfte'),
)
const TechnischeVoraussetzungen = lazy(() =>
  import('./components/Documentation/docs/TechnischeVoraussetzungen'),
)
const ZeitachseFuerArten = lazy(() =>
  import('./components/Documentation/docs/ZeitachseFuerArten'),
)
const ZeitachseFuerKulturen = lazy(() =>
  import('./components/Documentation/docs/ZeitachseFuerKulturen'),
)
const Sammlungen = lazy(() =>
  import('./components/Documentation/docs/Sammlungen'),
)
const Kulturen = lazy(() => import('./components/Documentation/docs/Kulturen'))
const Zaehlungen = lazy(() =>
  import('./components/Documentation/docs/Zaehlungen'),
)
const Teilkulturen = lazy(() =>
  import('./components/Documentation/docs/Teilkulturen'),
)
const Lieferungen = lazy(() =>
  import('./components/Documentation/docs/Lieferungen'),
)
const SammelLieferungen = lazy(() =>
  import('./components/Documentation/docs/SammelLieferungen'),
)
const Events = lazy(() => import('./components/Documentation/docs/Events'))
const FelderBlenden = lazy(() =>
  import('./components/Documentation/docs/FelderBlenden'),
)
const OrdnerBlenden = lazy(() =>
  import('./components/Documentation/docs/OrdnerBlenden'),
)
const Planen = lazy(() => import('./components/Documentation/docs/Planen'))
const GenetischeVielfalt = lazy(() =>
  import('./components/Documentation/docs/GenetischeVielfalt'),
)
const QualitaetsKontrollen = lazy(() =>
  import('./components/Documentation/docs/QualitatesKontrollen'),
)
const VermehrungErinnertSich = lazy(() =>
  import('./components/Documentation/docs/VermehrungErinnertSich'),
)
const OpenSource = lazy(() =>
  import('./components/Documentation/docs/OpenSource'),
)
const FehlerMelden = lazy(() =>
  import('./components/Documentation/docs/FehlerMelden'),
)
const Schnittstellen = lazy(() =>
  import('./components/Documentation/docs/Schnittstellen'),
)
const Pwa = lazy(() => import('./components/Documentation/docs/Pwa'))
const Ios = lazy(() => import('./components/Documentation/docs/Ios'))
const Offline = lazy(() => import('./components/Documentation/docs/Offline'))
const OfflineWie = lazy(() =>
  import('./components/Documentation/docs/OfflineWie'),
)
const History = lazy(() => import('./components/Documentation/docs/History'))
const Technologien = lazy(() =>
  import('./components/Documentation/docs/Technologien'),
)
const Struktur = lazy(() => import('./components/Documentation/docs/Struktur'))
const Roadmap = lazy(() => import('./components/Documentation/docs/Roadmap'))
const Konten = lazy(() => import('./components/Documentation/docs/Konten'))
const Datenschutz = lazy(() =>
  import('./components/Documentation/docs/Datenschutz'),
)

const DocRoutes = () => (
  <>
    <Route path="ziele" element={<Ziele />} />
    <Route path="ziele/herkuenfte" element={<ZieleHerkuenfte />} />
    <Route
      path="technische-voraussetzungen"
      element={<TechnischeVoraussetzungen />}
    />
    <Route path="zeitachse-art" element={<ZeitachseFuerArten />} />
    <Route path="zeitachse-kultur" element={<ZeitachseFuerKulturen />} />
    <Route path="herkuenfte" element={<Herkuenfte />} />
    <Route path="sammlungen" element={<Sammlungen />} />
    <Route path="kulturen" element={<Kulturen />} />
    <Route path="zaehlungen" element={<Zaehlungen />} />
    <Route path="teilkulturen" element={<Teilkulturen />} />
    <Route path="lieferungen" element={<Lieferungen />} />
    <Route path="sammel-lieferungen" element={<SammelLieferungen />} />
    <Route path="events" element={<Events />} />
    <Route path="felder-blenden" element={<FelderBlenden />} />
    <Route path="ordner-blenden" element={<OrdnerBlenden />} />
    <Route path="planen" element={<Planen />} />
    <Route path="genetische-vielfalt" element={<GenetischeVielfalt />} />
    <Route path="qualitaets-kontrollen" element={<QualitaetsKontrollen />} />
    <Route path="gedaechtnis" element={<VermehrungErinnertSich />} />
    <Route path="open-source" element={<OpenSource />} />
    <Route path="fehler-ideen" element={<FehlerMelden />} />
    <Route path="schnittstellen" element={<Schnittstellen />} />
    <Route path="pwa" element={<Pwa />} />
    <Route path="ios" element={<Ios />} />
    <Route path="offline" element={<Offline />} />
    <Route path="offline-wie" element={<OfflineWie />} />
    <Route path="historisierung" element={<History />} />
    <Route path="technologien" element={<Technologien />} />
    <Route path="struktur" element={<Struktur />} />
    <Route path="roadmap" element={<Roadmap />} />
    <Route path="konten" element={<Konten />} />
    <Route path="datenschutz" element={<Datenschutz />} />
  </>
)

export default DocRoutes
