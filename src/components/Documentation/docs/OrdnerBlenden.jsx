import { DokuDate } from '..'

const OrdnerBlenden = () => (
  <>
    <h1>Ordner ein- und ausblenden</h1>
    <DokuDate>28.12.2019</DokuDate>
    <h3>Wieso</h3>
    <p>
      Nicht jeder nutzt alle Features. Features, die nicht verwendet werden,
      verringern die Übersicht, lenken ab und können verwirren.
      <br />
    </p>
    <p>
      In vermehrung.ch gibt es daher im Navigationsbaum eine Reihe von Ordnern,
      die eingeblendet werden können, standardmässig aber ausgeblendet sind.
      <br />
    </p>
    <p>
      Für die Navigation notwendige Ordner können nicht ausgeblendet werden.
      <br />
    </p>
    <h3>So geht&#39;s</h3>
    <p>
      Dafür wird das Zahnrad-Symbol oben rechts verwendet.
      <br />
    </p>
    <h3>So funktioniert es</h3>
    <p>Die standardmässig ausgeblendeten Ordner sind:</p>
    <ul>
      <li>Kulturen</li>
      <li>Teilkulturen</li>
      <li>Zählungen</li>
      <li>Lieferungen</li>
      <li>Events</li>
    </ul>
    <p>
      Diese Ordner sind für die Navigation nicht besonders nützlich. Hingegen
      können sie nützlich sein, wenn Filter gesetzt werden. Denn sie zeigen alle
      Kulturen/Teilkulturen/Zählungen/Lieferungen/Events, welche den Filter
      erfüllen.
    </p>
  </>
)

export default OrdnerBlenden
