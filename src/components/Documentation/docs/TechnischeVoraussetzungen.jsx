import { Link } from 'react-router'

import dokuStyles from '../index.module.css'

export const TechnischeVoraussetzungen = () => (
  <>
    <h1>Technische Voraussetzungen</h1>
    <p className={dokuStyles.dokuDate}>27.10.2026</p>
    <p>
      Sie brauchen eine aktuelle Version eines modernen{' '}
      <strong>Browsers</strong>.
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
