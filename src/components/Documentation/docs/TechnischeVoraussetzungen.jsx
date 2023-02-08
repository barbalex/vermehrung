import { Link } from 'react-router-dom'
import { DokuDate } from '..'

const TechnischeVoraussetzungen = () => (
  <>
    <h1>Technische Voraussetzungen</h1>
    <DokuDate>22.10.2020</DokuDate>
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
    </ul>
    <p>
      Etwas weniger gut geeignet ist Safari auf MacOS. Sollte aber
      funktionieren. Leider{' '}
      <Link to="/Dokumentation/ios">
        funktioniert vermehrung.ch auf iOS (iPhone, iPad) nicht
      </Link>
      <br />
    </p>
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
        Um Daten zu erfassen, brauchen Sie keine Internet-Verbindung.
      </Link>
      .
    </p>
  </>
)

export default TechnischeVoraussetzungen
