import { Link } from 'react-router'

import dokuStyles from '../../index.module.css'
import one from './001_button.png'
import two from './002_version.png'

export const History = () => (
  <>
    <h1>Daten-Historie</h1>
    <p className={dokuStyles.dokuDate}>11.09.2020</p>
    <p>
      Die Historisierung zeigt alle bisherigen Versionen eines Datensatzes an.
      Und sie ermöglicht, jeden dieser Zustände wieder herzustellen.
      <br />
    </p>
    <p>
      Um offline fähig zu sein (
      <Link to="/Dokumentation/offline-wie">mehr dazu</Link>) erstellt
      vermehrung.ch bei jeder Änderung eines Datensatzes eine neue Version.
      Somit{' '}
      <strong>
        verfügt vermehrung.ch über eine vollständige Historisierung aller
        Datensätze
      </strong>
      , beginnend seit deren Import im Sommer 2020. Aktuell (im Herbst 2020)
      gibt es bei den meisten Daten noch keine historischen Versionen, weil sie
      noch nicht innerhalb von vermehrung.ch bearbeitet wurden.
      <br />
    </p>
    <p>
      Um die Historie eines Datensatzes zu sehen, klickt man auf das
      entsprechende Symbol:
      <br />
      <img
        src={one}
        referrerPolicy="no-referrer"
        alt="Symbol"
        style={{ maxWidth: 1000 }}
      />
    </p>
    <ul>
      <li>In der Mobil-Ansicht gibt es statt des Symbols einen Menü-Eintrag</li>
      <li>
        Das Historie-Symbol ist inaktiv, wenn es keine historische Versionen
        gibt
      </li>
      <li>
        Es ist auch inaktiv, wenn man offline ist (historische Versionen sind
        nur online verfügbar)
      </li>
    </ul>
    <p>
      Nun öffnet sich rechts der aktuellen Version eine neue Spalte. Sie stellt
      alle verfügbaren Versionen in einem &quot;Karussell&quot; dar:
      <br />
      <img
        src={two}
        referrerPolicy="no-referrer"
        alt="Version"
        style={{ maxWidth: 1000 }}
      />
      <br />
    </p>
    <ul>
      <li>Die letzte Version ist im Karussell sichtbar</li>
      <li>
        Unterschiede zur aktuellen Version werden farblich hervorgehoben (die
        &quot;nicht vergleichen&quot;-Schaltfläche schaltet diese Funktion aus)
      </li>
      <li>
        Mit den Pfeil-Symbolen, Pfeil-Tasten auf der Tastatur (nach Klick
        irgendwo ins Formular) oder Wischgesten kann man sich nun Version um
        Version durch die Historie bewegen
      </li>
      <li>
        Die Punkte zuunterst stellen je eine Version dar. Durch Klick auf einen
        Punkt navigiert man zur entsprechenden Version
      </li>
      <li>
        Klickt man auf die &quot;wiederherstellen&quot;-Schaltfläche, wird die
        aktuelle Version durch die historische ersetzt
      </li>
      <li>
        Die &quot;i&quot;-Schaltfläche rechts neben der Versions-Nummer führt zu
        dieser Dokumentations-Seite
      </li>
    </ul>
  </>
)
