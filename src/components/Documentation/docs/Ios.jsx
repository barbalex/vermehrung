import { Link } from 'react-router-dom'
import { DokuDate } from '..'

const Ios = () => (
  <>
    <h1>iPhone/iPad bzw. iOS</h1>
    <DokuDate>22.10.2020</DokuDate>
    <p>
      vermehrung.ch funktioniert nicht auf iOS, d.h. auf iPhones und iPads.
      <br />
    </p>
    <p>
      <strong>
        Sorry iPhone und iPad BenutzerInnen: Ihr habt für viel Geld ein Gerät
        gekauft, dass euch von den modernsten Apps ausschliesst. Weil Apple von
        euch noch mehr Geld will.
      </strong>
      <br />
    </p>
    <p>
      Wollt ihr mehr wissen? Dann müssen wir etwas ausholen:
      <br />
    </p>
    <ul>
      <li>
        Apple verdient <strong>jährlich 10 bis 15 Milliarden</strong> mit dem
        App Store: sie beanspruchen 15-30% jeder Überweisung für sich selbst (
        <a
          href="https://www.statista.com/chart/9671/developer-earnings-apple-app-store"
          target="_blank"
          rel="noreferrer"
        >
          Quelle
        </a>
        )
      </li>
      <li>
        Das ist ungerechtfertigt und geht nur, weil Apple ihr Monopol ausnützt
      </li>
      <li>
        Eine ganze Reihe von Firmen wehren sich dagegen, auch gerichtlich. Allen
        voran Epic Games mit Fortnite. Sogar Microsoft hat sich klar dagegen
        gestellt (
        <a
          href="https://t3n.de/news/apple-vs-epic-microsoft-seite-1315266/"
          target="_blank"
          rel="noreferrer"
        >
          Quelle
        </a>
        ). In den USA und der EU wird der Sachverhalt von den
        Wettbewerbsbehörden untersucht (
        <a
          href="https://www.bbc.com/news/technology-54280982"
          target="_blank"
          rel="noreferrer"
        >
          Quelle
        </a>
        )
      </li>
      <li>
        vermehrung.ch ist eine <Link to="/Dokumentation/pwa">Web App</Link>
      </li>
      <li>
        Web App&#39;s brauchen keinen App Store. Man kann sie direkt vom Browser
        aus installieren. Das passt Apple nicht
      </li>
      <li>
        Web App&#39;s können aber nur mit anderen Apps konkurrieren, wenn der
        Browser die dafür nötigen Fähigkeiten anbietet
      </li>
      <li>
        Apple verbietet auf den eigenen Mobilgeräten (Betriebssystem
        &quot;iOS&quot;) die Installation anderer Browser und setzt dies im App
        Store durch (die &quot;Browser&quot; von Chrome und Firefox sind auf iOS
        nur eine Hülle um Safari)
      </li>
      <li>
        Weil auf Apple-Mobilgeräten nur Safari zur Verfügung steht, kann Apple
        verhindern, dass die für konkurrenzfähige Web-Apps nötigen Fähigkeiten
        verfügbar sind. Apple stellt zwar einige grundlegende Fähigkeiten
        bereit, damit nicht zu viele Web-Apps den Dienst verweigern. Aber{' '}
        <strong>
          sie schränken diese Fähigkeiten ganz bewusst ein, damit Web-Apps
          gegenüber Apps aus dem App Store nicht konkurrenzfähig sein können
        </strong>
      </li>
      <li>
        Eine zentrale Funktion konkurrenzfähiger Apps ist Offline-Fähigkeit
      </li>
      <li>
        Offline kann eine App nur funktionieren, wenn die benötigten Daten lokal
        gespeichert werden. Apple schränkt die lokal speicherbare Menge Daten
        sehr stark ein
      </li>
      <li>
        Diese Einschränkungen werden ungenügend bis gar nicht dokumentiert.
        Apple hat kein Interesse, Web App Entwicklern das Leben einfach und ihre
        Wettbewerbs-Einschränkung bekannt zu machen
      </li>
      <li>
        Apple erlaubt Web-Apps nur 5 Megabytes zu speichern. Apple gibt
        Entwicklern keine Möglichkeit, diese Grenze im App-Code zu erkennen oder
        zu erhöhen. Benutzer können offenbar im Einstellungs-App die Grenze auf
        50MB erhöhen (
        <a
          href="https://stackoverflow.com/a/8991626/712005"
          target="_blank"
          rel="noreferrer"
        >
          Quelle
        </a>
        )
      </li>
      <li>
        <p>
          Gibt es auf Ihrem Smartphone ein offline fähiges App, dass mit 5
          Megabytes auskommt? Vermutlich nicht
        </p>
      </li>
      <li>
        Im Gegensatz zu Safari stellen Chrome, Edge und Firefox Benutzern so
        viel Speicherplatz zur Verfügung, wie die Festplatte hergibt. Also
        potentiell mehrere Gigabytes
      </li>
      <li>
        Android und Windows ermöglichen die Installation von Apps am App Store
        vorbei. Man kann sogar eigene App-Stores anbieten - und damit direkt
        diejenigen von Google oder Windows konkurrenzieren!
      </li>
      <li>
        <strong>
          vermehrung.ch benötigt 90 bis 120 MB lokalen Speicher. Damit kann
          vermehrung.ch nicht auf iOS-Geräten funktionieren
        </strong>
      </li>
      <li>
        Damit vermehrung.ch auf iOS funktionieren könnte, müsste es von Grund
        auf beruhend auf der Apple-Programmiersprache Swift neu entwickelt
        werden. Und über den App Store verteilt werden
      </li>
      <li>
        Web-Apps erleben momentan einen enormen Aufschwung, denn sie
        funktionieren auf allen Betriebssystemen, auf denen ein moderner Browser
        ausgeführt werden kann. Zum Beispiel:
        <ul>
          <li>Windows</li>
          <li>Android</li>
          <li>macOS</li>
          <li>
            <a
              href="https://www.google.com/chromebook/chrome-os/"
              target="_blank"
              rel="noreferrer"
            >
              ChromeOS
            </a>
          </li>
          <li>Linux</li>
          <li>
            <a
              href="https://consumer.huawei.com/en/press/media-coverage/2019/huawei-new-operating-system-harmonyos"
              target="_blank"
              rel="noreferrer"
            >
              HarmonyOS
            </a>
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Fire_OS"
              target="_blank"
              rel="noreferrer"
            >
              Fire OS
            </a>
          </li>
          <li>
            <a
              href="https://www.tizen.org/about"
              target="_blank"
              rel="noreferrer"
            >
              Tizen
            </a>
          </li>
          <li>alle künftig neu entstehenden</li>
        </ul>
      </li>
      <li>
        Müsste vermehrung.ch mit den bisher üblichen Mitteln für die vier
        wichtigsten Betriebssysteme (Windows, macOS, Android, iOS) programmiert
        werden, wäre der Aufwand ungefähr 6 mal so hoch als mit einer Web App
        alleine. Das wäre weder sinnvoll noch mit den verfügbaren
        (Naturschutz-!)Budgets finanzierbar
      </li>
      <li>
        Apple rechnet damit, dass sich kein App-Entwickler leisten kann, nicht
        auf iOS verfügbar zu sein. Weil dort für Apps die höchsten Preise
        bezahlt werden (
        <a
          href="https://fueled.com/blog/app-store-vs-google-play/#:~:text=In%20fact%2C%20research%20by%20Stardust,freely%20available%20on%20Android%20devices."
          target="_blank"
          rel="noreferrer"
        >
          Quelle
        </a>
        )
      </li>
    </ul>
    <p>
      Vermehrung.ch und iOS-Benutzerinnen sind somit Opfer des
      Kollateralschadens, der entsteht, weil Apple an Zahlungen in und für Apps
      30% verdienen will.
      <br />
    </p>
  </>
)

export default Ios
