import { Link } from 'react-router-dom'
import { DokuDate } from '../index.jsx'

export const Technologien = () => (
  <>
    <h1>Verwendete Technologien</h1>
    <DokuDate>03.09.2020</DokuDate>
    <ul>
      <li>
        <a
          href="https://www.postgresql.org"
          target="_blank"
          rel="noreferrer"
        >
          PostgreSQL
        </a>{' '}
        als Datenbank
      </li>
      <li>
        <a
          href="https://de.wikipedia.org/wiki/Docker_(Software)"
          target="_blank"
          rel="noreferrer"
        >
          Docker
        </a>{' '}
        für die Server
      </li>
      <li>
        Konflikt-fähige Datenstrukturen{' '}
        <Link to="/Dokumentation/offline-wie/#1-konflikt-fähige-datenstruktur">
          à la CouchDB
        </Link>
      </li>
      <li>
        <a
          href="https://github.com/facebook/graphql"
          target="_blank"
          rel="noreferrer"
        >
          GraphQL
        </a>{' '}
        als Daten-Schnittstelle, in Form von{' '}
        <a
          href="https://hasura.io"
          target="_blank"
          rel="noreferrer"
        >
          Hasura
        </a>
      </li>
      <li>
        <a
          href="https://mobx.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          MobX
        </a>
        ,{' '}
        <a
          href="https://github.com/mobxjs/mobx-state-tree"
          target="_blank"
          rel="noreferrer"
        >
          MobX-State-Tree
        </a>{' '}
        für app-seitigen &quot;Status&quot; und offline-fähige Warteschlangen
        für Operationen
      </li>
      <li>
        <a
          href="https://facebook.github.io/react/index.html"
          target="_blank"
          rel="noreferrer"
        >
          React
        </a>{' '}
        für die Benutzeroberfläche
      </li>
      <li>
        <a
          href="https://vitejs.dev/"
          target="_blank"
          rel="noreferrer"
        >
          Vite
        </a>{' '}
        als Entwicklungs-Umgebung
      </li>
    </ul>
  </>
)
