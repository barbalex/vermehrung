import { Suspense } from 'react'

import { DokuDate } from '../../index.jsx'
import structure from './structure.png'

export const Struktur = () => (
  <Suspense fallback={null}>
    <h1>Daten-Struktur</h1>
    <DokuDate>20.01.2020</DokuDate>
    <p>
      <img
        src={structure}
        referrerPolicy="no-referrer"
        alt="Daten-Struktur"
        width="100%"
      />
    </p>
    <p>
      Der zugehörige SQL-Code befindet sich{' '}
      <a
        href="https://github.com/barbalex/vermehrung/tree/master/src/sql"
        target="_blank"
        rel="noreferrer"
      >
        hier
      </a>
      .
    </p>
  </Suspense>
)
