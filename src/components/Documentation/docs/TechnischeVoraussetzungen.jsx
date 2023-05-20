import { Link } from 'react-router-dom'
import { DokuDate } from '..'

const TechnischeVoraussetzungen = () => (
  <>
    <h1>Technische Voraussetzungen</h1>
    <DokuDate>20.05.2023</DokuDate>
    <p>
      Sie brauchen eine aktuelle Version eines modernen{' '}
      <strong>Browsers</strong>.<br />
      Zum Beispiel (aber nicht abschliessend):
    </p>
    <ul>
      <li>Chrome</li>
      <li>Edge Chromium</li>
      <li>Firefox</li>
      <li>Opera</li>
      <li>Safari</li>
    </ul>
    <p>
      Nicht geeignet ist der Internet Explorer.
      <br />
    </p>
    <p>
      vermehrung.ch funktioniert <strong>auf allen Betriebssystemen</strong>.
      Mehr dazu <Link to="/Dokumentation/pwa">hier</Link>.<br />
    </p>
    <p>
      <Link to="/Dokumentation/offline">
        Um Daten zu erfassen, brauchen Sie keine Internet-Verbindung
      </Link>
      .
    </p>
  </>
)

export default TechnischeVoraussetzungen
