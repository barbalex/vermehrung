import { Link } from 'react-router-dom'

import { DokuDate } from '../../index.jsx'
import one from './001.png'
import two from './002.png'
import three from './003.png'
import four from './004.gif'
import five from './005.png'
import six from './006.png'
import seven from './007.png'

export const Offline = () => (
  <>
    <h1>Offline arbeiten</h1>
    <DokuDate>29.01.2021</DokuDate>
    <h3>Wieso?</h3>
    <p>
      Nicht jeder Garten verfügt über WLAN. Nicht jedes Eingabegerät verfügt
      über mobiles Internet. Zudem gibt es räumliche und manchmal zeitliche
      Lücken in der Verfügbarkeit von mobilem Internet.
      <br />
    </p>
    <h3>Kann eine Web-App offline funktionieren?</h3>
    <p>
      Ja. Na ja - nicht auf iOS,{' '}
      <Link to="/Dokumentation../iOS">
        weil Apple Web-App&#39;s nicht genug Speicher geben will
      </Link>
      .<br />
    </p>
    <h3>Verbindungs-Status</h3>
    <p>
      vermehrung zeigt die Verfügbarkeit des Internets an:
      <br />
      <img
        src={one}
        referrerPolicy="no-referrer"
        alt="online"
        style={{ maxWidth: 1000 }}
      />
      <br />
    </p>
    <p>
      Und auch dessen Fehlen:
      <br />
      <img
        src={two}
        referrerPolicy="no-referrer"
        alt="offline"
        style={{ maxWidth: 1000 }}
      />
      <br />
    </p>
    <p>
      Weil vermehrung alle Daten, die Sie lesen dürfen, voraus lädt und auf
      Ihrem Gerät speichert, müssen Sie nicht erschrecken, wenn Sie plötzlich
      offline sein sollten. Sie können einfach weiter arbeiten. Alles, was Sie
      brauchen, ist da 😎.
      <br />
    </p>
    <h3>Schlange für Operationen</h3>
    <p>
      Arbeiten Sie offline, packt vermehrung jede Daten-Änderung in
      &quot;Päckchen&quot; (genannt: Operation). Diese Päckchen warten geduldig.
      Das offline-Symbol zeigt die Länge der Warteschlange an:
      <br />
      <img
        src={three}
        referrerPolicy="no-referrer"
        alt="3 wartende Operationen"
        width={50}
      />
      <br />
    </p>
    <p>
      Sobald vermehrung wieder online ist, werden die Päckchen dem Server
      geschickt...
      <br />
      <img
        src={four}
        referrerPolicy="no-referrer"
        alt="wieder online"
        width={50}
      />
      <br />
    </p>
    <p>
      ...und dort verarbeitet. Sobald die Zahl verschwunden ist, ist ihr Gerät
      mit dem Server synchronisiert.
      <br />
    </p>
    <p>
      Sie können sich durch Klick auf das Online-Symbol auch die Schlange
      auflisten lassen:
      <img
        src={five}
        referrerPolicy="no-referrer"
        alt="Operationen-Liste"
        style={{ maxWidth: 1000 }}
      />
      <br />
      ...und wenn nötig Operationen widerrufen.
      <br />
    </p>
    <h3>Konflikte</h3>
    <p>
      Was macht der Server mit Ihren Päckchen? Er speichert sie natürlich, wie
      jeder gute Server. Zusätzlich sucht er <strong>Konflikte</strong> und
      wählt <strong>Sieger</strong>.<br />
      <br />
    </p>
    <h4>Konflikte finden</h4>
    <p>
      Gibt es widersprüchliche Versionen des gleichen Datensatzes, nennen wir
      dies einen Konflikt.
      <br />
      Konflikte entstehen, wenn mehrere Personen gleichzeitig denselben
      Datensatz ändern. Oder während jemand offline war.
      <br />
      Konflikte können auch entstehen, wenn dieselbe Person vermehrung.ch auf
      mehreren Geräten (teilweise offline) benutzt.
      <br />
    </p>
    <h4>Sieger wählen</h4>
    <p>
      Der Server von vermehrung.ch wählt automatisch Sieger. Leider ist er nicht
      allwissend. Darum notiert er beim Sieger auch, welche widersprüchlichen
      Versionen es gibt. Das wird im Formular angezeigt:
      <br />
      <img
        src={six}
        referrerPolicy="no-referrer"
        alt="Konflikt gefunden"
        style={{ maxWidth: 1000 }}
      />
      <br />
    </p>
    <p>
      Klickt man auf den Konflikt, öffnet sich das Formular mit der
      widersprüchlichen Version:
      <br />
      <img
        src={seven}
        referrerPolicy="no-referrer"
        alt="widersprüchliche Version"
        style={{ maxWidth: 1000 }}
      />
      <br />
    </p>
    <p>Hier sehen Sie die Unterschiede. Sie haben drei Optionen:</p>
    <ol>
      <li>widersprüchliche Version verwerfen</li>
      <li>widersprüchliche Version übernehmen</li>
      <li>
        aktuelle Version anpassen und danach die wiedersprüchliche verwerfen
      </li>
    </ol>
    <p>
      Im Gegensatz zum Server sind sie hoffentlich allwissend genug, um den
      Konflikt abschliessend zu bereinigen 😁
      <br />
    </p>
    <p>
      Es steckt mehr hinter der offline-Fähigkeit von vermehrung.ch. Neugierige{' '}
      <Link to="/Dokumentation/offline-wie">lesen hier weiter</Link>.
    </p>
  </>
)
