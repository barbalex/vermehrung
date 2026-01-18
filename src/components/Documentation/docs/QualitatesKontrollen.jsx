import { Link } from 'react-router'

import dokuStyles from '../index.module.css'

export const QualitaetsKontrollen = () => (
  <>
    <h1>Qualitäts-Kontrollen</h1>
    <p className={dokuStyles.dokuDate}>28.06.2020</p>
    <h3>Ziel</h3>
    <ul>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 11:
        &quot;Qualitätskontrollen erhöhen die Qualität der Arbeit&quot;
        <br />
      </li>
    </ul>
    <h3>Umsetzung</h3>
    <ul>
      <li>
        Manager und Art-Verantwortliche können auf Ebene Art und Kultur
        Qualitäts-Kontrollen ausführen
      </li>
      <li>Gärtner können auf Ebene Kultur Qualitäts-Kontrollen ausführen</li>
      <li>
        Ein paar Dutzend Abfragen listen Verdachtsfälle. Die Liste besteht aus
        Links, welche direkt den entsprechenden Datensatz öffnen
      </li>
      <li>
        Die Liste kann gefiltert werden. Sie aktualisiert sich nach Korrekturen
        automatisch selbst
      </li>
    </ul>
  </>
)
