import { DokuDate } from '../index.jsx'

const Planen = () => (
  <>
    <h1>Planen</h1>
    <DokuDate>15.11.2019</DokuDate>
    <h3>Wo</h3>
    <p>Die folgenden Vorgänge können geplant werden:</p>
    <ul>
      <li>Sammlungen</li>
      <li>Lieferungen</li>
      <li>Events</li>
      <li>Zählungen</li>
    </ul>
    <h3>Wozu</h3>
    <ul>
      <li>Um Handlungen zu Planen</li>
      <li>
        Um Planen zu können, wie viele (auspflanz-bereite) Pflanzen im nächsten
        oder allenfalls übernächsten Jahr zur Verfügung stehen
      </li>
    </ul>
    <h3>Wie</h3>
    <p>
      In Sammlungen, Lieferungen und Events gibt es ein Feld
      &quot;geplant&quot;.
      <br />
      Zählungen werden (von der Artverantwortlichen/Projektleitung) als
      &quot;Ziel&quot; oder (vom Gärtner) als &quot;Prognose&quot; markiert.
      <br />
    </p>
    <h3>Wozu Zählungen planen?</h3>
    <p>
      Sammlungen, Lieferungen und Events planen ist einleuchtend. Wozu aber
      Zählungen planen?
      <br />
    </p>
    <p>
      Eine geplante Zählung ist nichts anderes als die Aussage, dass an dem
      festgelegten Datum damit gerechnet wird, über so viele (auspflanz-bereite)
      Pflanzen zu verfügen. In dieser Zahl werden nicht nur Lieferungen
      berücksichtigt. Vor allem wird geschätzt, wie viele Pflanzen{' '}
      <strong>vermehrt</strong> werden. Und Vermehrung ist ja der Kern des
      Projekts 🎯
    </p>
  </>
)

export default Planen
