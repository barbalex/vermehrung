import { DokuDate } from '../../index.jsx'
import felderBlenden from './felderBlenden1.gif'

const FelderBlenden = () => (
  <>
    <h1>Felder ein- und ausblenden</h1>
    <DokuDate>20.09.2019</DokuDate>
    <h3>Wieso</h3>
    <p>
      Nicht jeder erfasst dieselben Daten. Felder, die nicht verwendet werden,
      verringern die Übersicht, lenken ab und können verwirren.
      <br />
      In vermehrung.ch gibt es daher eine Reihe von Feldern, die ausgeblendet
      werden können.
      <br />
      Felder, welche für das Funktionieren der Anwendung wichtig sind, können
      nicht ausgeblendet werden.
      <br />
    </p>
    <h3>So geht&#39;s</h3>
    <p>
      Dafür wird das Zahnrad-Symbol oben rechts verwendet:
      <br />
      <img
        src={felderBlenden}
        referrerPolicy="no-referrer"
        alt="Felder wählen"
      />
      <br />
    </p>
    <h3>So funktioniert es</h3>
    <p>
      Es ist möglich, dass gewisse Felder nur in bestimmten Kulturen benutzt
      werden. Daher wirkt sich das Ein- und Ausblenden bei allem, was zu einer
      Kultur gehört, nur innerhalb dieser Kultur aus. Das sind:
    </p>
    <ul>
      <li>Kultur</li>
      <li>Teil-Kulturen</li>
      <li>Zählungen</li>
      <li>Events</li>
    </ul>
    <p>
      Was nicht einer Kultur zugeordnet ist, wird pro Benutzer bestimmt. Das
      sind momentan:
    </p>
    <ul>
      <li>Herkünfte</li>
      <li>Gärten</li>
      <li>Lieferungen</li>
    </ul>
  </>
)

export default FelderBlenden
