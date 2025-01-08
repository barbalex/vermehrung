import { Link } from 'react-router'
import { DokuDate } from '../index.jsx'

export const GenetischeVielfalt = () => (
  <>
    <h1>Genetische Vielfalt</h1>
    <DokuDate>04.10.2019</DokuDate>
    <p>
      <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 2 lautet: &quot;Die
      genetische Vielfalt von Kulturen ist bekannt.&quot;
      <br />
    </p>
    <p>
      Das ist nicht ganz einfach zu realisieren. Schon der Begriff
      &quot;genetische Vielfalt&quot; lässt viel Spielraum. Trotzdem ist klar,
      dass er für bedrohte Arten grosse Bedeutung hat. Jede Methode wird daher
      nur eine Annäherung sein. In vermehrung geschieht es so:
      <br />
    </p>
    <p>
      <strong>
        In Sammlungen, Lieferungen und Kulturen wird im Feld &quot;von Anzahl
        Individuen&quot; erfasst bzw. geschätzt, von wie vielen Individuen die
        Pflanzen stammen. Unabhängig davon, welche Einheiten gezählt wurden.
      </strong>
    </p>
  </>
)
