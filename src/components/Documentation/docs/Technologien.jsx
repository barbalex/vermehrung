import { Link } from 'react-router'

import dokuStyles from '../index.module.css'

export const Technologien = () => (
  <>
    <h1>Verwendete Technologien</h1>
    <p className={dokuStyles.dokuDate}>27.10.2026</p>
    <ul>
      <li>
        <a href="https://www.postgresql.org" target="_blank" rel="noreferrer">
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
        <a href="https://postgrest.org" target="_blank" rel="noreferrer">
          PostgREST
        </a>{' '}
        als Daten-Schnittstelle
      </li>
      <li>
        <a href="https://jotai.org/" target="_blank" rel="noreferrer">
          Jotai
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
        <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">
          Vite
        </a>{' '}
        als Entwicklungs-Umgebung
      </li>
    </ul>
  </>
)
