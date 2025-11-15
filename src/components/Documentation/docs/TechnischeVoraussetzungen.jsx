import { Link } from 'react-router'

import { dokuDate } from '../index.module.css'

export const TechnischeVoraussetzungen = () => (
  <>
    <h1>Technische Voraussetzungen</h1>
    <p className={dokuDate}>20.05.2023</p>
    <p>
      Sie brauchen eine aktuelle Version eines modernen{' '}
      <strong>Browsers</strong>.<br />
      Zum Beispiel (aber nicht abschliessend):
    </p>
    <ul>
      <li>Chrome</li>
      <li>Edge</li>
      <li>Firefox</li>
      <li>Opera</li>
      <li>Safari</li>
    </ul>
    <p>
      Nicht geeignet ist der Internet Explorer.
      <br />
    </p>
    <p>
      vermehrung funktioniert <strong>auf allen Betriebssystemen</strong>.
    </p>
    <p>
      Sie können vermehrung auch{' '}
      <Link to="/Dokumentation/pwa">installieren</Link> und{' '}
      <Link to="/Dokumentation/offline">ohne Internet-Verbindung arbeiten</Link>
      .
    </p>
  </>
)
