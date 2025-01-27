import { Suspense } from 'react'

import { DokuDate } from '../index.jsx'

export const Sammlungen = () => (
  <Suspense fallback={null}>
    <h1>Sammlungen</h1>
    <DokuDate>17.01.2020</DokuDate>
    <h3>Verortung</h3>
    <p>
      Im Gegensatz zur Herkunft (welche eine genetische Einheit abgrenzt),
      lokalisieren die Koordinaten in der Sammlung,{' '}
      <strong>wo genau gesammelt wurde</strong>.<br />
      <br />
    </p>
    <p>Später muss das vermutlich mit Geometrien ergänzt werden.</p>
    <p>&nbsp;</p>
  </Suspense>
)
