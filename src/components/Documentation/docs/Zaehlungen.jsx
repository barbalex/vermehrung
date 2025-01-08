import { Link } from 'react-router-dom'
import { DokuDate } from '../index.jsx'

export const Zaehlungen = () => (
  <>
    <h1>Zählungen</h1>
    <DokuDate>25.08.2020</DokuDate>
    <h3>Ziele</h3>
    <ul>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 3: &quot;Anzahl
        Pflanzen und Anzahl auspflanz-bereite Pflanzen sind bekannt und können
        geplant werden.&quot;
        <br />
        Zählungen dokumentieren Anzahlen oder die geplante Vermehrung einer
        Kultur zu einem bestimmten Zeitpunkt
      </li>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 4: &quot;Anzahl
        Mutter-Pflanzen ist bekannt&quot;
      </li>
    </ul>
    <h3>Umsetzung</h3>
    <p>
      Bei einer Zählung erfasst man <strong>den ganzen Bestand</strong> einer
      Kultur. Es sollen immer die totalen Anzahlen der drei grundlegenden
      Einheiten erhoben werden:
    </p>
    <ul>
      <li>
        Anzahl Pflanzen (Total, inklusive auspflanzungsbereite, Mutter- und
        Jungpflanzen)
      </li>
      <li>Anzahl auspflanz-bereite Pflanzen</li>
      <li>Anzahl Mutter-Pflanzen</li>
    </ul>
    <p>
      Ausnahme: Für zukünftige Planung (Prognosen und Ziele) reicht es, die
      Anzahl auspflanz-bereite Pflanzen zu erheben. Prognosen und Ziele werden
      in derselben Datenstruktur wie Zählungen erfasst, damit eine einheitliche
      Auswertung möglich ist. Für die Planung ist aber die Anzahl Pflanzen und
      Mutter-Pflanzen weniger relevant.
      <br />
    </p>
    <p>
      <strong>Mutter-Pflanzen</strong> sind Pflanzen, die aus einer Sammlung
      oder via GAW aus einer Sammlung angeliefert wurden. Daraus vermehrte sind
      nicht Mutter-Pflanzen.
      <br />
    </p>
    <p>
      <strong>Jungpflanzen</strong> sind noch nicht auspflanzungsbereit und
      keine Mutter-Pflanzen. Ihre Anzahl berechnet sich somit aus:
    </p>
    <ul>
      <li>Anzahl Pflanzen</li>
      <li>minus Anzahl auspflanz-bereite Pflanzen</li>
      <li>minus Anzahl Mutter-Pflanzen</li>
    </ul>
    <p>
      Um die Datenerfassung zu minimieren und um Widersprüche zu verhindern wird
      die Anzahl Jungpflanzen von vermehrung.ch jeweils berechnet, sobald die
      dafür benötigten Felder erfasst wurden.
      <br />
    </p>
    <h3>Abgrenzung zu Lieferungen</h3>
    <p>Lieferungen und Zählungen sind unterschiedliche Dinge:</p>
    <ul>
      <li>
        &quot;auspflanz-bereite Pflanzen&quot; in der Zählung heisst: So viele
        gibt es in der Kultur
      </li>
      <li>
        &quot;auspflanz-bereite Pflanzen&quot; in der Lieferung heisst: So viele
        werden von einer Kultur in eine andere geliefert oder ausgesetzt
      </li>
    </ul>
    <p>
      Die Zahlen einer Zählung und einer Lieferung sind somit nur dann gleich,
      wenn die ganze Kultur geliefert und damit die Kultur aufgelöst wird. Was
      kaum passiert.
      <br />
    </p>
    <p>
      vermehrung kann rechnen. Erfolgt eine Aus-Lieferung von 20
      &quot;auspflanz-bereite Pflanzen&quot;, subtrahiert vermehrung diese 20
      von der zuletzt gezählten Anzahl um darzustellen, wie viele
      &quot;auspflanz-bereite Pflanzen&quot; aktuell existieren.
      <br />
    </p>
    <p>
      Um eine Lieferung zu erfassen ist es daher in der Regel nicht nötig, eine
      Zählung durchzuführen. Eine Zählung ist nur nötig, wenn der Gärtner oder
      die Projektleitung aktuelle Zahlen haben will, welche{' '}
      <strong>Vermehrung</strong> und <strong>Mortalität</strong>{' '}
      berücksichtigen.
      <br />
    </p>
  </>
)
