import { DokuDate } from '../index.jsx'

export const Konten = () => (
  <>
    <h1>Konten und Benutzerrechte</h1>
    <DokuDate>30.06.2020</DokuDate>
    <h3>Begriffe</h3>
    <ul>
      <li>
        <strong>Personen</strong> sind Adressen, welche vielerorts in
        vermehrung.ch verwendet werden. Zum Beispiel, um den Besitzer eines
        Gartens zu wählen
      </li>
      <li>
        <strong>Benutzer</strong> sind Personen mit einem Konto für die
        Benutzung von vermehrung.ch
      </li>
      <li>
        Ein <strong>Konto</strong> erlaubt einem Benutzer die Anmeldung in
        vermehrung.ch
      </li>
      <li>
        Welche Rechte ein Benutzer hat, wird bestimmt durch:
        <ul>
          <li>Rolle (siehe unten)</li>
          <li>
            Bei welchen Arten und Gärten der Benutzer als Mitarbeiter erfasst
            wurde (siehe unten)
          </li>
        </ul>
      </li>
    </ul>
    <p>
      Die Konten von vermehrung.ch sind nicht mit denjenigen von apflora.ch
      verbunden. Benutzer beider Anwendungen brauchen daher in beiden Apps ein
      eigenes Konto.
      <br />
    </p>
    <h3>Rollen</h3>
    <p>Einem Benutzer wird eine Rolle zugeordnet. Davon gibt es drei:</p>
    <ul>
      <li>
        Gärtner: liest und editiert Daten von Gärten, in denen er/sie als
        Mitarbeiter erfasst ist
      </li>
      <li>
        Artverantwortlich: liest und editiert Daten für Arten, in denen er/sie
        als Mitarbeiter erfasst ist. Plus: liest und editiert Daten von Gärten,
        in denen er/sie als Mitarbeiter erfasst ist
      </li>
      <li>Manager: liest und editiert (beinahe) alle Daten</li>
    </ul>
    <h3>Mitarbeitend bei Arten</h3>
    <p>
      Bei Benutzern mit der Rolle &quot;Artverantwortlich&quot;, kann bzw. muss
      gewählt werden, in welchen Arten er/sie mitarbeitet. Dies ist möglich:
    </p>
    <ul>
      <li>im Formular der Person</li>
      <li>im Formular der Art</li>
    </ul>
    <p>
      Auf Daten anderer Arten hat dieser Benutzer keinen Zugriff.
      <br />
      Artverantwortliche haben Zugriff auf die Daten aller Herkünfte.
      <br />
    </p>
    <h3>Mitarbeitend bei Gärten</h3>
    <p>
      Bei Benutzern mit der Rolle &quot;Gärtner&quot; oder
      &quot;Artverantwortlich&quot; kann bzw. muss gewählt werden, in welchen
      Gärten er/sie mitarbeitet. Dies ist möglich:
    </p>
    <ul>
      <li>im Formular der Person</li>
      <li>im Formular des Gartens</li>
    </ul>
    <p>
      Gärtner haben ausschliesslich Zugriff auf diese Daten. Artverantwortliche
      zusätzlich zu den Daten der Arten, bei denen sie mitarbeiten.
      <br />
    </p>
    <h3>Konto erstellen</h3>
    <ol>
      <li>Person erfassen</li>
      <li>Rolle und email nicht vergessen</li>
      <li>Auf &quot;Neues Konto&quot; klicken</li>
      <li>
        Die Person bei den betreffenden Arten und Gärten als Mitarbeiter
        erfassen
      </li>
      <li>
        Die Person informieren
        <br />
      </li>
    </ol>
    <h3>Erstmalige Anmeldung</h3>
    <ol>
      <li>vermehrung.ch besuchen</li>
      <li>Auf &quot;Daten bearbeiten&quot; klicken</li>
      <li>Login-Formular erscheint</li>
      <li>Email eingeben</li>
      <li>Auf &quot;neues Passwort setzen&quot; klicken</li>
      <li>Sobald email ankommt, dem Link folgen und ein Passwort setzen</li>
      <li>In vermehrung.ch damit anmelden</li>
    </ol>
  </>
)
