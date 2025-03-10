import { Suspense } from 'react'
import { Link } from 'react-router'

import { DokuDate } from '../index.jsx'

export const Herkuenfte = () => (
  <Suspense fallback={null}>
    <h1>Herkünfte</h1>
    <DokuDate>17.01.2020</DokuDate>
    <h3>Ziele</h3>
    <ul>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 1: Herkünfte sind
        bekannt und werden innerhalb von Kulturen nicht vermischt.
        <br />
        Darum ist eine Herkunft definiert als:
        <br />
        <strong>
          die geografische Einheit, innerhalb derer die Art eine genetische
          Einheit bildet, die nachverfolgt werden können soll
        </strong>
        <br />
      </li>
    </ul>
    <h3>Nummer</h3>
    <p>
      Die Nummer gibt der Herkunft einen Namen, der nur grob Rückschlüsse auf
      den Ort zulässt. Gärtner sehen von der Herkunft nur diese Nummer. So soll
      erreicht werden, dass Gärtner nicht aus eigenem Antrieb sammeln.
      <br />
      <br />
    </p>
    <h3>Abgrenzung</h3>
    <p>
      Die Abgrenzung genetischer Einheiten von Arten mit unterschiedlicher
      Ausbreitungs-Biologie sollte sich im Prinzip unterscheiden. Darum kann es
      sinnvoll sein, für unterschiedliche Arten am selben Ort unterschiedliche
      Herkünfte zu generieren. Die App überlässt es den BiologInnen, zu
      entscheiden, ob dieselbe Herkunft (= geografischer Umriss) für mehrere
      Arten verwendet wird oder nur für eine.
    </p>
  </Suspense>
)
