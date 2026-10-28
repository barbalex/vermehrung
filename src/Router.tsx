import { lazy } from 'react'

import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router'
import { RouterProvider } from 'react-router/dom'

const Home = lazy(async () => ({
  default: (await import('./routes/index.tsx')).Home,
}))
const VermehrungIndex = lazy(async () => ({
  default: (await import('./routes/Vermehrung/index.tsx')).VermehrungIndex,
}))
const FourOhFour = lazy(async () => ({
  default: (await import('./routes/404.tsx')).FourOhFour,
}))
const Layout = lazy(async () => ({
  default: (await import('./components/Layout.tsx')).Layout,
}))
const Documentation = lazy(async () => ({
  default: (await import('./components/Documentation/index.tsx')).Documentation,
}))
const Ziele = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Ziele.tsx')).Ziele,
}))
const ZieleHerkuenfte = lazy(async () => ({
  default: (await import('./components/Documentation/docs/ZieleHerkuenfte.tsx'))
    .ZieleHerkuenfte,
}))
const Herkuenfte = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Herkuenfte.tsx'))
    .Herkuenfte,
}))
const TechnischeVoraussetzungen = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/TechnischeVoraussetzungen.tsx')
  ).TechnischeVoraussetzungen,
}))
const ZeitachseFuerArten = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/ZeitachseFuerArten.tsx')
  ).ZeitachseFuerArten,
}))
const ZeitachseFuerKulturen = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/ZeitachseFuerKulturen.tsx')
  ).ZeitachseFuerKulturen,
}))
const Sammlungen = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Sammlungen.tsx'))
    .Sammlungen,
}))
const Kulturen = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Kulturen.tsx'))
    .Kulturen,
}))
const Zaehlungen = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Zaehlungen.tsx'))
    .Zaehlungen,
}))
const Teilkulturen = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/Teilkulturen/index.tsx')
  ).Teilkulturen,
}))
const Lieferungen = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Lieferungen.tsx'))
    .Lieferungen,
}))
const SammelLieferungen = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/SammelLieferungen.tsx')
  ).SammelLieferungen,
}))
const Bedarf = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Bedarf.tsx')).Bedarf,
}))
const FelderBlenden = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/FelderBlenden/index.tsx')
  ).FelderBlenden,
}))
const OrdnerBlenden = lazy(async () => ({
  default: (await import('./components/Documentation/docs/OrdnerBlenden.tsx'))
    .OrdnerBlenden,
}))
const Planen = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Planen.tsx')).Planen,
}))
const GenetischeVielfalt = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/GenetischeVielfalt.tsx')
  ).GenetischeVielfalt,
}))
const QualitaetsKontrollen = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/QualitatesKontrollen.tsx')
  ).QualitaetsKontrollen,
}))
const VermehrungErinnertSich = lazy(async () => ({
  default: (
    await import('./components/Documentation/docs/VermehrungErinnertSich.tsx')
  ).VermehrungErinnertSich,
}))
const OpenSource = lazy(async () => ({
  default: (await import('./components/Documentation/docs/OpenSource.tsx'))
    .OpenSource,
}))
const FehlerMelden = lazy(async () => ({
  default: (await import('./components/Documentation/docs/FehlerMelden.tsx'))
    .FehlerMelden,
}))
const Pwa = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Pwa/index.tsx')).Pwa,
}))
const Offline = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Offline/index.tsx'))
    .Offline,
}))
const OfflineWie = lazy(async () => ({
  default: (await import('./components/Documentation/docs/OfflineWie.tsx'))
    .OfflineWie,
}))
const History = lazy(async () => ({
  default: (await import('./components/Documentation/docs/History/index.tsx'))
    .History,
}))
const Technologien = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Technologien.tsx'))
    .Technologien,
}))
const Struktur = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Struktur/index.tsx'))
    .Struktur,
}))
const Roadmap = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Roadmap.tsx'))
    .Roadmap,
}))
const Konten = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Konten.tsx')).Konten,
}))
const Datenschutz = lazy(async () => ({
  default: (await import('./components/Documentation/docs/Datenschutz.tsx'))
    .Datenschutz,
}))
const Vermehrung = lazy(async () => ({
  default: (await import('./routes/Vermehrung/Vermehrung.tsx')).Vermehrung,
}))
const QueuedQueries = lazy(async () => ({
  default: (await import('./components/QueuedQueries/index.tsx')).QueuedQueries,
}))
const RouterErrorBoundary = lazy(async () => ({
  default: (await import('./components/shared/RouterErrorBoundary.tsx'))
    .RouterErrorBoundary,
}))

export const Router = () => {
  // console.log('App rendering')

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/Vermehrung/*"
          element={<VermehrungIndex />}
          errorElement={<RouterErrorBoundary />}
        >
          <Route
            path="*"
            element={<Vermehrung />}
            errorElement={<RouterErrorBoundary />}
          />
          <Route
            path="ausstehende-Operationen"
            element={<QueuedQueries />}
            errorElement={<RouterErrorBoundary />}
          />
        </Route>
        <Route
          path="Dokumentation"
          element={<Documentation />}
          errorElement={<RouterErrorBoundary />}
        >
          <Route path="ziele">
            <Route index element={<Ziele />} />
            <Route path="herkuenfte" element={<ZieleHerkuenfte />} />
          </Route>
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
          <Route
            path="events"
            element={<Navigate to="/Dokumentation/bedarf" replace />}
          />
          <Route path="bedarf" element={<Bedarf />} />
          <Route path="felder-blenden" element={<FelderBlenden />} />
          <Route path="ordner-blenden" element={<OrdnerBlenden />} />
          <Route path="planen" element={<Planen />} />
          <Route path="genetische-vielfalt" element={<GenetischeVielfalt />} />
          <Route
            path="qualitaets-kontrollen"
            element={<QualitaetsKontrollen />}
          />
          <Route path="gedaechtnis" element={<VermehrungErinnertSich />} />
          <Route path="open-source" element={<OpenSource />} />
          <Route path="fehler-ideen" element={<FehlerMelden />} />
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
      </Route>,
    ),
  )

  return <RouterProvider router={router} />
}
