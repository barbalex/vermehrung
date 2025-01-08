import { Link } from 'react-router'
import { DokuDate } from '../index.jsx'

export const ZeitachseFuerKulturen = () => (
  <>
    <h1>Zeit-Achse für Kulturen</h1>
    <DokuDate>20.09.2019</DokuDate>
    <h3>Ziele</h3>
    <ul>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziele</Link> 3 und 4:
        &quot;Anzahl Pflanzen und Anzahl auspflanz-bereite Pflanzen sind bekannt
        und können geplant werden&quot;, &quot;Anzahl Mutterpflanzen ist
        bekannt&quot;.
      </li>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 5: &quot;Wesentliche
        Vorgänge sind dokumentiert&quot;.
        <br />
        Auf einer hohen Ebene werden dokumentiert: An- und Aus-Lieferungen,
        Vermehrung
      </li>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 7:
        &quot;MitarbeiterInnen können sich rasch einen Überblick über wichtige
        Aspekte von Kulturen schaffen&quot;
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
      <li>Anzahl Mutter-Pflanzen</li>
    </ul>
    <p>
      ...aus Zählungen und Lieferungen, durchgeführt und geplant.
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
      Von den primären Informationen erhält man somit auf den ersten Blick eine
      Übersicht.
      <br />
      Von den sekundären, indem man auf der Zeit-Achse über den Zeitpunkten
      schwebt.
      <br />
      <br />
    </p>
    <h3>Wie</h3>
    <h4>Linien für Anzahlen</h4>
    <p>Als Grundlage werden verwendet:</p>
    <ul>
      <li>
        Anzahlen aus durchgeführten Zählungen (nur solche, die in der
        Vergangenheit liegen)
      </li>
      <li>
        Anzahlen aus geplanten Zählungen, wenn sie nach der letzten
        durchgeführten Zählung geplant sind
      </li>
      <li>
        Anzahlen aus durchgeführten Lieferungen:
        <br />
        Referenz sind die Anzahlen aus letzten zuvor durchgeführten Zählung.
        <br />
        Erfolgte die Lieferung vor der ersten Zählung, wird als Referenz für
        alle Einheiten die Anzahl 0 verwendet.
        <br />
        Zur Referenz wird summiert, was in der Zwischenzeit geliefert wurde.
        <br />
        Berücksichtigt werden nur Lieferungen, die in der Vergangenheit liegen.
      </li>
      <li>
        Anzahlen aus geplanten Lieferungen, die nach der letzten durchgeführten
        Zählung geplant sind
      </li>
    </ul>
    <p>
      Linien, die geplante Anzahlen darstellen, verwenden dieselbe Farbe wie die
      Linie für die entsprechende Einheit bei durchgeführten Zählungen. Aber
      etwas aufgehellt.
      <br />
      <br />
    </p>
    <h4>Punkte für ignorierte Zählungen</h4>
    <ul>
      <li>
        Geplante Zählungen, nach denen eine Zählung durchgeführt wurde, werden
        nicht als Teil der Linien berücksichtigt.
        <br />
        Stattdessen werden sie in separaten Punkten dargestellt
      </li>
    </ul>
    <h4>Säulen für Lieferungen</h4>
    <ul>
      <li>
        An-Lieferungen werden als Säulen mit positiven Werten dargestellt,
      </li>
      <li>Aus-Lieferungen mit negativen Werten</li>
      <li>
        Lieferungen, die nach der letzten durchgeführten Zählung geplant sind,
        werden etwas aufgehellt dargestellt.
        <br />
        Vor diesem Zeitpunkt geplante werden in abweichenden Farben dargestellt
      </li>
    </ul>
  </>
)
