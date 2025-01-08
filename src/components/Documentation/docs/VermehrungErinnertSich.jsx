import { Suspense } from 'react'

import { DokuDate } from '../index.jsx'

export const VermehrungErinnertSich = () => (
  <Suspense fallback={null}>
    <h1>vermehrung erinnert sich</h1>
    <DokuDate>30.09.2019</DokuDate>
    <p>
      Beim Arbeiten speichert vermehrung laufend den aktuellen Zustand. Zum
      Beispiel:
    </p>
    <ul>
      <li>Welche Äste des Navigations-Baums offen sind</li>
      <li>Ob Filter gesetzt sind</li>
      <li>Welches Formular offen ist</li>
    </ul>
    <p>
      Beim Schliessen schreibt vermehrung den letzten Zustand auf Ihre
      Festplatte.
      <br />
      Beim Öffnen liest vermehrung ihn aus und stellt ihn wieder her.
      <br />
    </p>
    <p>Man kann also genau dort weiter arbeiten, wo man aufgehört hat.</p>
  </Suspense>
)
