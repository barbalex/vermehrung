import { Link } from 'react-router-dom'

import { DokuDate } from '../..'
import installieren from './installieren.webp'

const Pwa = () => (
  <>
    <h1>Progressive Web App</h1>
    <DokuDate>22.10.2020</DokuDate>
    <p>
      vermehrung.ch ist eine{' '}
      <a href="https://developers.google.com/web/progressive-web-apps">
        <strong>Progressive Web App</strong>
      </a>{' '}
      (PWA).
      <br />
    </p>
    <p>
      &quot;Progressive Web Apps&quot; sind im Kern Web-Applikationen.
      <br />
    </p>
    <p>
      <strong>Was ist der Unterschied zu einer gewöhnlichen Webseite?</strong>
    </p>
    <ul>
      <li>
        Sie können vermehrung auf Desktop/Startseite platzieren bzw.
        &quot;installieren&quot;.
        <br />
        In Chrome auf PC und Mac verwenden Sie dazu das Symbol in der URL-Zeile:
        <br />
        <img
          src={installieren}
          referrerPolicy="no-referrer"
          alt="installieren"
          width="200"
          height="104"
        />
        <br />
        Auf Android werden Sie von Chrome gefragt, ob sie vermehrung auf dem
        Startbildschirm platzieren wollen.
      </li>
      <li>
        Danach hat vermehrung eine eigene Verknüpfung und startet ausserhalb des
        Browsers in einem eigenen Fenster, ohne URL-Zeile.
      </li>
    </ul>
    <p>
      <strong>
        Was ist der Unterschied zu einer traditionellen Applikation?
      </strong>
    </p>
    <ul>
      <li>
        Die App funktioniert auf allen Bertriebssystemen und auf allen Geräten
        mit modernem Browser
      </li>
      <li>
        Statt die App zu installieren, müssen Sie nur vermehrung.ch besuchen
      </li>
      <li>Updates erfolgen automatisch</li>
      <li>
        Einer neuen Mitarbeiterin schicken Sie einfach URL und Login. Schon kann
        sie loslegen!
      </li>
    </ul>
  </>
)

export default Pwa
