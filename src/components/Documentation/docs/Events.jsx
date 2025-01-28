import { Suspense } from 'react'
import { Link } from 'react-router'

import { DokuDate } from '../index.jsx'

export const Events = () => (
  <Suspense fallback={null}>
    <h1>Events</h1>
    <DokuDate>28.01.2025</DokuDate>
    <h3>Ziele</h3>
    <ul>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 5: &quot;Wesentliche
        Vorgänge sind dokumentiert.&quot;
      </li>
      <li>Aufgaben können geplant bzw. koordiniert werden</li>
    </ul>
    <h3>Umsetzung</h3>
    <p>
      Für das Projekt wesentliche Vorgänge, die weder Sammlungen, noch
      Vermehrung oder Lieferungen entsprechen, können als Events dokumentiert
      werden.
      <br />
    </p>
    <p>
      Auch als Events werden Aufgaben erfasst: Das sind einfach geplante Events.
      Sind sie erledigt, wird das Attribut &quot;geplant&quot; entfernt. Und
      schon sind sie dokumentiert.
      <br />
    </p>
    <p>
      Events planen ist &quot;opt-in&quot;. Damit das Feld &quot;geplant&quot;
      verfügbar ist, muss man es bei den Optionen einschalten.
    </p>
  </Suspense>
)
