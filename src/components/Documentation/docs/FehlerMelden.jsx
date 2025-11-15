import { Link } from 'react-router'

import { dokuDate } from '../index.module.css'

export const FehlerMelden = () => (
  <>
    <h1>Fehler, Ideen, Vorschläge melden</h1>
    <p className={dokuDate}>30.09.2019</p>
    <p>Das geht so:</p>
    <ul>
      <li>
        Auf{' '}
        <Link to="/Dokumentation//github.com/barbalex/vermehrung/issues">
          GitHub issues
        </Link>
        ...
      </li>
      <li>...schaut ihr bitte zuerst, ob euer Anliegen schon gemeldet wurde</li>
      <li>Falls ja: beteiligt euch an der existierenden Diskussion</li>
      <li>Wenn nicht, könnt ihr einen neuen &quot;Issue&quot; eröffnen</li>
    </ul>
    <p>
      GitHub eignet sich, weil man die Übersicht behält, priorisieren und den
      Verlauf dokumentieren kann. Jeder, der sich an einem Issue beteiligt oder
      ihn mit dem entsprechenden Befehl abonniert, wird automatisch per email
      über neue Bemerkungen informiert, z.B. wenn der Fehler korrigiert wurde.
      <br />
    </p>
    <p>
      Allerdings ist GitHub öffentlich. Man kann mir daher Anliegen auch per{' '}
      <Link to="/Dokumentationmailto:alex@gabriel-software.ch">email</Link>{' '}
      melden.
    </p>
  </>
)
