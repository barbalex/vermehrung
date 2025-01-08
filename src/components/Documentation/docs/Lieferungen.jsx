import { Suspense } from 'react'
import { Link } from 'react-router'

import { DokuDate } from '../index.jsx'

export const Lieferungen = () => (
  <Suspense fallback={null}>
    <h1>Lieferungen</h1>
    <DokuDate>28.06.2020</DokuDate>
    <h3>Ziele</h3>
    <ul>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 1: &quot;Herkünfte
        sind bekannt und werden innerhalb von Kulturen nicht vermischt.&quot;
        <br />
        Lieferungen enthalten die dafür notwendigen Informationen (von-Sammlung
        oder von-Kultur)
      </li>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 2: &quot;Die
        genetische Vielfalt von Kulturen ist bekannt.&quot;
        <br />
        Daher wird in der Lieferung &quot;von Anzahl Individuen&quot; erfasst.
        Aufgrund dieser Angabe sollte es möglich sein, &quot;von Anzahl
        Individuen&quot; der Kultur nachzuführen
      </li>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 3: &quot;Anzahl
        Pflanzen und Anzahl auspflanz-bereite Pflanzen sind bekannt und können
        geplant werden.&quot;
        <br />
        In Lieferungen erfasste Anzahlen dokumentieren die Bewegung dieser
        Einheiten zwischen Sammlungen, Kulturen und der Auspflanzung
      </li>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 5: &quot;Wesentliche
        Vorgänge sind dokumentiert&quot;
      </li>
      <li>Lieferscheine können erstellt werden</li>
    </ul>
    <h3>Umsetzung</h3>
    <ul>
      <li>
        <p>Die Felder einer Lieferung sind in Bereiche gruppiert:</p>
        <ul>
          <li>
            <p>was</p>
            <ul>
              <li>Art</li>
              <li>Anzahlen</li>
            </ul>
          </li>
          <li>
            <p>von</p>
            <ul>
              <li>Sammlung</li>
              <li>Kultur</li>
            </ul>
          </li>
          <li>
            <p>nach</p>
            <ul>
              <li>Kultur</li>
              <li>ausgepflanzt</li>
            </ul>
          </li>
          <li>
            <p>wann</p>
            <ul>
              <li>datum</li>
              <li>geplant</li>
            </ul>
          </li>
          <li>
            <p>wer</p>
            <ul>
              <li>Person</li>
              <li>Bemerkungen</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <p>
          Bei Sammel-Lieferungen erscheint in der Standard-Einstellung rechts
          der Lieferung die Sammel-Lieferung. Siehe bei den{' '}
          <Link to="/Dokumentation/Sammel-Lieferungen">Sammel-Lieferungen</Link>
        </p>
      </li>
    </ul>
  </Suspense>
)
