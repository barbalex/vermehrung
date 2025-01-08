import { Suspense } from 'react'
import { Link } from 'react-router'

import { DokuDate } from '../index.jsx'

export const ZeitachseFuerArten = () => (
  <Suspense fallback={null}>
    <h1>Zeit-Achse für Arten</h1>
    <DokuDate>29.09.2019</DokuDate>
    <h3>Ziele</h3>
    <ul>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziele</Link> 3 und 4:
        &quot;Anzahl Pflanzen und Anzahl auspflanz-bereite Pflanzen sind bekannt
        und können geplant werden&quot;, &quot;Anzahl Mutterpflanzen ist
        bekannt&quot;
      </li>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 5: &quot;Wesentliche
        Vorgänge sind dokumentiert&quot;.
        <br />
        Auf einer hohen Ebene werden dokumentiert: Vermehrung, Auspflanzungen
      </li>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 7:
        &quot;MitarbeiterInnen können sich rasch einen Überblick über wichtige
        Aspekte von Arten schaffen&quot;
      </li>
    </ul>
    <p>
      Die Übersicht dokumentiert auch auf einer hohen Ebene zentrale Vorgänge
      (Projekt-Ziel 5).
      <br />
      <br />
    </p>
    <h3>Was</h3>
    <p>
      Dargestellt werden primär die Mengen der für die Planung wesentlichen
      Einheiten:
    </p>
    <ul>
      <li>Anzahl Pflanzen</li>
      <li>Anzahl auspflanzungs-bereite Pflanzen</li>
    </ul>
    <p>
      ...aus Sammlungen und Auspflanzungen (= Lieferungen, nach: Ausgepflanzt),
      durchgeführt und geplant.
      <br />
      <br />
    </p>
    <p>
      Sekundär (in den Fenstern, die sich öffnen, wenn man über einem Zeitpunkt
      schwebt) werden weitere Informationen dargestellt, sofern vorhanden:
    </p>
    <ul>
      <li>Gramm Samen</li>
      <li>Andere Mengen</li>
      <li>Von Anzahl Individuen</li>
      <li>Beschreibung auspflanzbereite Pflanzen</li>
      <li>Bemerkungen</li>
    </ul>
    <p>
      Von den primären Informationen erhält man auf den ersten Blick eine
      Übersicht.
      <br />
      Von den sekundären, indem man auf der Zeit-Achse über den Zeitpunkten
      schwebt.
      <br />
      <br />
    </p>
    <h3>Wie</h3>
    <h4>Linien für (gezählte) Anzahlen</h4>
    <p>Als Grundlage werden verwendet:</p>
    <ul>
      <li>Anzahlen aus durchgeführten Zählungen</li>
      <li>
        Anzahlen aus geplanten Zählungen, wenn sie nach der letzten
        durchgeführten Zählung geplant sind.
        <br />
        Vor der letzten durchgeführten Zählung geplante Zählungen werden
        ignoriert
      </li>
      <li>
        Anzahlen aus ausgeführten Sammlungen und Auspflanzungen:
        <br />
        Referenz sind die Anzahlen aus letzten zuvor ausgeführten Zählung.
        <br />
        Erfolgt eine Sammlung vor der ersten Zählung, wird 0 verwendet.
        <br />
        Zur Referenz wird summiert, was in der Zwischenzeit gesammelt wurde. Und
        subtrahiert, was in der Zwischenzeit ausgepflanzt wurde
      </li>
      <li>
        Anzahlen aus geplanten Sammlungen und Auspflanzungen, die nach der
        letzten durchgeführten Zählung geplant sind
      </li>
    </ul>
    <p>
      Linien, die geplante Anzahlen darstellen, verwenden dieselbe Farbe wie die
      Linie für die entsprechende Einheit bei durchgeführten Zählungen. Aber
      etwas aufgehellt.
      <br />
      <br />
    </p>
    <h4>Säulen für Sammlungen und Auspflanzungen</h4>
    <ul>
      <li>
        Sammlungen werden als Säulen mit positiven Werten dargestellt (nur
        &quot;Anzahl Pflanzen&quot; - auspflanz-bereite Pflanzen werden nicht
        gesammelt)
      </li>
      <li>Auspflanzungen werden mit negativen Werten dargestellt</li>
      <li>
        Sammlungen und Auspflanzungen, die nach der letzten durchgeführten
        Zählung geplant sind, werden etwas aufgehellt dargestellt.
        <br />
        Vor diesem Zeitpunkt geplante werden ignoriert.
      </li>
    </ul>
  </Suspense>
)
