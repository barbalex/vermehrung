import { DokuDate } from '../index.jsx'

export const Schnittstellen = () => (
  <>
    <h1>Schnittstellen</h1>
    <DokuDate>15.06.2019</DokuDate>
    <p>
      Brauchen Sie in anderen Anwendungen Zugriff auf Ihre Daten in
      vermehrung.ch? Kein Problem: vermehrung.ch verfügt über eine öffentliche{' '}
      <a
        href="//github.com/facebook/graphql"
        target="_blank"
        rel="noreferrer"
      >
        GraphQL
      </a>
      -Schnittstelle.
      <br />
    </p>
    <p>
      Diese Schnittstelle wird auch von vermehrung.ch selber benutzt. Es gibt
      daher kaum eine Funktionalität, welche damit nicht möglich ist, solange
      man mit passenden Benutzerrechten zugreift.
      <br />
    </p>
    <p>
      Für mehr Informationen wenden Sie sich an{' '}
      <a
        href="mailto:alex@gabriel-software.ch"
        target="_blank"
        rel="noreferrer"
      >
        Alex
      </a>
      .
    </p>
  </>
)
