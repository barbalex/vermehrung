import { dokuDate } from '../../index.module.css'
import structure from './structure.png'

export const Struktur = () => (
  <>
    <h1>Daten-Struktur</h1>
    <p className={dokuDate}>20.01.2020</p>
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
  </>
)
