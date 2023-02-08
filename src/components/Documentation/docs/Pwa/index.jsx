import { Link } from 'react-router-dom'

import { DokuDate } from '../..'
import installieren from './installieren.png'

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
      &quot;Progressive Web Apps&quot; sind Web-Apps und werden für Browser
      entwickelt. Weil sie einige zusätzliche Anforderungen erfüllen, können sie
      je länger je weniger von &quot;normalen&quot; Apps unterschieden werden.
      Das ist das erklärte Ziel von Google und Microsoft.
      <br />
    </p>
    <p>
      <strong>Was ist der Unterschied zu einer gewöhnlichen Webseite?</strong>
    </p>
    <ul>
      <li>
        <p>
          Sie können vermehrung auf Desktop/Startseite platzieren bzw.
          &quot;installieren&quot;.
        </p>
        <ul>
          <li>
            In Chrome auf PC und Mac öffnen Sie dazu das Menü ganz oben rechts:
            <br />
            <img
              src={installieren}
              referrerPolicy="no-referrer"
              alt="installieren"
            />
            Ganz rechts in der URL-Zeile gibt es dafür ein +-Symbol.
          </li>
          <li>
            Auf Android werden Sie von Chrome gefragt, ob sie vermehrung auf dem
            Startbildschirm platzieren wollen.
          </li>
        </ul>
      </li>
      <li>
        Danach hat vermehrung eine eigene Verknüpfung und startet ausserhalb des
        Browsers in einem eigenen Fenster, ohne URL-Zeile.
      </li>
      <li>
        Auch vermehrung-Links sollen bald mit der installierten Version geöffnet
        werden (funktioniert bereits auf Android)
      </li>
      <li>
        Leider{' '}
        <Link to="/Dokumentation/ios">
          funktioniert vermehrung.ch auf iOS (iPhone, iPad) nicht
        </Link>
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
