import { Link } from 'react-router-dom'
import { DokuDate } from '../index.jsx'

const Kulturen = () => (
  <>
    <h1>Kulturen</h1>
    <DokuDate>20.01.2021</DokuDate>
    <h3>Ziele</h3>
    <ul>
      <li>
        <p>
          <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 1: Herkünfte sind
          bekannt und werden innerhalb von Kulturen nicht vermischt.
          <br />
          Darum ist eine Kultur definiert als:
        </p>
        <ul>
          <li>eine Art</li>
          <li>aus einer Herkunft</li>
          <li>
            in einem Garten
            <br />
            Die Datenbank akzeptiert pro Garten nur eine aktive Kultur derselben
            Art und Herkunft. Plus ein Zwischenlager, siehe weiter unten
          </li>
        </ul>
      </li>
      <li>
        <p>
          <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 2: Die genetische
          Vielfalt von Kulturen ist bekannt.
          <br />
          Indem das Feld &quot;von Anzahl Individuen&quot; bei jeder
          An-Lieferung nachgeführt wird
        </p>
      </li>
    </ul>
    <h3>Aktiv vs. erloschen</h3>
    <p>
      Eine Kultur beginnt aktiv (das gleichnamige Feld enthält in neuen Kulturen
      immer den Wert &quot;ja&quot;), kann aber erlöschen (Feld
      &quot;aktiv&quot; auf &quot;nein&quot; setzen).
      <br />
      Danach wird eine neue Kultur erstellt, wenn im selben Garten aus derselben
      Herkunft wieder eine Kultur entsteht.
      <br />
      <br />
      In einem Garten kann es pro Herkunft einer Art immer nur eine aktive
      Kultur geben. Das wird in der Datenbank durchgesetzt (plus ein für ein
      Zwischenlager, siehe unten).
      <br />
    </p>
    <h3>Spezielle Formen</h3>
    <p>...von Kulturen sind:</p>
    <ul>
      <li>Erhaltungs-Kulturen</li>
      <li>Zwischenlager</li>
    </ul>
    <h3>Zwischenlager</h3>
    <p>Der normale Ablauf einer Auspflanzung ist:</p>
    <ul>
      <li>
        Die Gärten liefern an die <em>G</em>arten<em>a</em>nlage <em>W</em>angen
        (GAW)
      </li>
      <li>Artverantwortliche holen die Pflanzen dort ab</li>
      <li>
        Für die GAW ist das meist keine normale Kultur, sondern ein
        kurzfristiges <strong>Zwischenlager</strong>
      </li>
      <li>
        Es kann vorkommen, dass die GAW mit einem Teil des Zwischenlagers eine
        neue Kultur gründet. Das wird in vermehrung.ch abgebildet, indem eine
        Lieferung vom Zwischenlager an diese Kultur erfasst wird
      </li>
    </ul>
    <p>
      Weil in der GAW daher von allen Arten zeitweise Zwischenlager existieren
      müssen, wurde vermehrung.ch folgendermassen angepasst:
    </p>
    <ul>
      <li>
        <p>
          Dieselbe &quot;Art aus Herkunft&quot; muss nun in einem Garten zwei
          mal vorkommen können:
        </p>
        <ul>
          <li>(maximal) Ein Mal als normale Kultur</li>
          <li>(maximal) Ein Mal als Zwischenlager</li>
          <li>
            (Darüber hinaus kann es beliebig viele inaktive Kulturen geben)
          </li>
        </ul>
      </li>
      <li>
        <p>
          Wird eine Sammlung erstellt bzw. geändert, prüft vermehrung.ch: Gibt
          es diese Kombination von Art und Herkunft schon als Zwischenlager im
          GAW? Wenn nicht, wird sie automatisch erstellt
        </p>
      </li>
    </ul>
    <h3>Genetische Vielfalt</h3>
    <p>
      Das Feld &quot;von Anzahl Individuen&quot; nennt oder schätzt die Anzahl
      Pflanzen, welche die Basis für die genetische Vielfalt der Kultur bildet.
      Es ist manuell nachzuführen, wenn An-Lieferungen erfolgen.
      <br />
    </p>
    <h3>Formular</h3>
    <p>Im Feld &quot;Art&quot; können nur Arten gewählt werden:</p>
    <ul>
      <li>
        Von denen es gesammelte Herkünfte gibt, für die im betreffenden Garten
        noch keine Kultur existiert
      </li>
      <li>
        Wenn die Herkunft schon gewählt wurde: Die in dieser Herkunft gesammelt
        wurden
      </li>
    </ul>
    <p>Im Feld &quot;Herkunft&quot; können nur Herkünfte gewählt werden:</p>
    <ul>
      <li>
        Von denen es gesammelte Arten gibt, für die im betreffenden Garten noch
        keine Kultur existiert
      </li>
      <li>
        Wenn die Art schon gewählt wurde: In denen diese Art gesammelt wurde
      </li>
    </ul>
  </>
)

export default Kulturen
