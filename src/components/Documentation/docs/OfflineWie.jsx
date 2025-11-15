import { dokuDate } from '../index.module.css'

export const OfflineWie = () => (
  <>
    <h1>Offline: Wie es funktioniert</h1>
    <p className={dokuDate}>18.12.2020</p>
    <p>
      Zuverlässige Offline-Fähigkeit ist schwer. Nachfolgend das für
      vermehrung.ch umgesetzte Konzept:
      <br />
    </p>
    <h3>1. Konflikt-fähige Datenstruktur</h3>
    <p>
      Das grösste Problem von Offline-Apps ist der Umgang mit Konflikten. Ist
      eine App offline, weiss die Benutzerin direkt nach der Speicherung eines
      Datensatzes (= &quot;Operation&quot;) nicht, ob alles geklappt hat. Oder
      jemand anderes am selben Datensatz gearbeitet hat und damit einen Konflikt
      geschaffen hat. Oder ob jemand nächste Woche bereits geänderte Daten
      synchronisiert und dabei einen bestehenden Konflikt sichtbar macht. Auch
      wenn dieselbe Person an mehreren Geräten arbeitet, kann es Konflikte
      geben.
      <br />
    </p>
    <p>Es muss also eine Methode geben:</p>
    <ul>
      <li>Alle Änderungen an Datensätzen jederzeit zurück zu verfolgen</li>
      <li>Konflikte automatisiert festzustellen</li>
      <li>Konflikte automatisiert zu lösen</li>
      <li>
        Der Benutzerin alle (automatisiert gelösten) Konflikte aufzulisten...
      </li>
      <li>
        ...und ihr die Möglichkeit zu geben, daraus die richtige Version zu
        wählen oder neu zu kombinieren
      </li>
      <li>Obiges auch für Löschungen zu ermöglichen</li>
      <li>Sowie der Benutzerin alle gescheiterten Operationen aufzulisten</li>
      <li>
        Diese Methode darf nicht von der Reihenfolge der Operationen abhängig
        sein
      </li>
    </ul>
    <p>
      Apps <em>können</em> zwar ohne diese Fähigkeiten offline-fähig gebaut
      werden. Benutzer können dann aber nie sicher sein, ob sie einmal erfasste
      Daten nicht wieder undokumentiert verlieren. Ausserdem kann die
      Reihenfolge der Operationen durcheinander geraten. Mit unberechenbaren
      Folgen.
      <br />
    </p>
    <p>
      Meine erste anspruchsvolle App baute (vor mehr als 10 Jahren) auf der eher
      unbekannten Datenbank CouchDB auf. arteigenschaften.ch lief bis vor zwei
      Jahren auf CouchDB. CouchDB ist heute immer noch die einzige Datenbank,
      die genau um diese Anforderung herum aufgebaut wurde. Daher weiss ich
      recht gut, wie Synchronisation und Konflikt-Management funktionieren. Und
      wie anspruchsvoll sie sind.
      <br />
    </p>
    <p>
      CouchDB und darum herum entstandene Werkzeuge erleben gerade ein revival.
      &quot;offline&quot; und &quot;live updates&quot; sind neuerdings gefragt.
      <br />
    </p>
    <p>
      CouchDB selbst ist (als no-sql-Datenbank) für apflora.ch und vermehrung.ch
      nicht geeignet. Ihre Methodik, Konflikte zu managen, kann allerdings auf
      andere Datenbanken und Apps übertragen werden (
      <a
        href="https://hasura.io/blog/couchdb-style-conflict-resolution-rxdb-hasura/#conflict-resolution-impl"
        target="_blank"
        rel="noreferrer"
      >
        mehr dazu hier
      </a>
      ). Die für vermehrung.ch verwendete Datenbank PostgreSQL ist dafür sehr
      gut geeignet.
      <br />
    </p>
    <p>Vereinfacht gesagt funktioniert das so:</p>
    <ul>
      <li>
        Datensätze werden nie geändert. Jede Änderung wird in eine neue Version
        geschrieben
      </li>
      <li>
        Datensätze speichern eine Liste ihrer &quot;Vorfahren&quot; (= frühere
        Versionen)
      </li>
      <li>
        Wird derselbe Datensatz parallel von mehreren Benutzern verändert,
        entsteht eine &quot;Ast-Gabel&quot; im (von oben nach unten wachsenden)
        &quot;Ahnen-Baum&quot;. Der Stamm ist der Ur-Ahne dieses Datensatzes,
        Gabelungen markieren Konflikte
      </li>
    </ul>
    <p>
      Nun gibt es schlaue Abfragen, welche immer wenn eine Version eintrifft:
    </p>
    <ul>
      <li>Konflikte finden</li>
      <li>Automatisch einen &quot;Sieger&quot; wählen</li>
      <li>
        Eine Liste aller &quot;Sieger&quot; bauen, mit Hinweis auf allfällige
        Konflikte
      </li>
    </ul>
    <p>
      <strong>Das Konzept ist</strong>:
    </p>
    <ul>
      <li>
        Die Datenbank führt jede Tabelle doppelt:
        <ul>
          <li>Eine Tabelle mit allen &quot;Versionen&quot;</li>
          <li>Eine Tabelle mit den &quot;Siegern&quot;</li>
        </ul>
      </li>
      <li>
        Wird eine Version geschrieben, berechnet und aktualisiert die Datenbank
        den Sieger
      </li>
      <li>
        Löscht die Benutzerin einen Datensatz
        <ul>
          <li>
            Wird eine neue Version geschrieben, welche die Löschung dokumentiert
          </li>
          <li>Wird ein Sieger erstellt, der als gelöscht gekennzeichnet ist</li>
        </ul>
      </li>
      <li>Findet die Datenbank Konflikte, listet sie sie beim Sieger auf</li>
      <li>
        Die App muss sich somit nicht selber um Versionen kümmern. Sie liest
        Sieger und schreibt Versionen
      </li>
      <li>
        Die App fragt nach jeder erfolgreichen Operation bei der Datenbank nach
        dem neuen Sieger. Und lässt sich generell über alle Änderungen laufend
        informieren (&quot;live&quot;)
      </li>
      <li>
        Entstehen Konflikte, zeigt die App sie der Benutzerin. Und gibt ihr die
        Möglichkeit:
        <ul>
          <li>Den richtigen Sieger zu bestimmen</li>
          <li>Informationen aller Konflikte zu vereinigen</li>
        </ul>
      </li>
    </ul>
    <h3>2. Warteschlange für Operationen</h3>
    <p>
      Die App verpackt alle Daten-Änderungen (Operationen) in
      &quot;Päckli&quot;. Die Päckli werden online sofort verarbeitet bzw. der
      Datenbank übermittelt. Offline werden sie zwischen-gespeichert. Und
      verarbeitet, sobald die App wieder online ist.
      <br />
    </p>
    <h3>3. Daten voraus laden</h3>
    <p>
      Bevor die App offline ist, muss sie die für die Feld- bzw. Garten-Arbeit
      gewünschten Daten geladen haben:
    </p>
    <ul>
      <li>
        Die App lädt beim ersten Start alle Daten, welche der jeweilige Benutzer
        lesen darf
      </li>
      <li>Daten werden dauernd live aktualisiert</li>
    </ul>
    <h3>4. Authentifikation</h3>
    <p>
      Offline ist Authentifikation nicht möglich. Die App funktioniert mit den
      vorhandenen Daten auch dann weiter, wenn die Authentifikation während der
      Offline-Zeit ablaufen sollte. Sobald sie online ist, wird die
      Authentifikation erneuert.
      <br />
    </p>
    <h3>5. Suche, Auswertungen</h3>
    <p>
      Suche, Zeit-Achsen und Exporte funktionieren auch offline.
      <br />
    </p>
    <h3>6. Dateien</h3>
    <p>
      Dateien können offline nicht verwaltet werden, da keine Verbindung zum
      Speicherdienst besteht. Sie werden daher ausgeblendet.
      <br />
    </p>
    <h3>7. Schrittweise Umsetzung</h3>
    <p>Es gab viel Arbeit. Sehr viel. Beispiele:</p>
    <ul>
      <li>Die Anzahl Tabellen in der Datenbank wurde verdoppelt (!)</li>
      <li>Die Datenbank musste lernen, mit Konflikten umzugehen</li>
      <li>
        Die lokale Datenhaltung der App musste von Grund auf neu aufgebaut
        werden (!)
      </li>
      <li>
        Das Management der Operationen (App), Konflikte und Daten (Datenbank)
        und die Daten-Schnittstelle beanspruchen nun mehr Ressourcen (Leistung
        und Speicher)
      </li>
      <li>
        Während die neue App aufgebaut wurde, musste die bisherige weiter
        betrieben werden
      </li>
    </ul>
    <p>
      Bilanz: Die Implementation war ca. 14 Wochen Aufwand. Ein zweites Mal
      würde das wohl halb so lange dauern.
      <br />
    </p>
  </>
)
