import { Link } from 'react-router-dom'
import { DokuDate } from '../index.jsx'

export const SammelLieferungen = () => (
  <>
    <h1>Sammel-Lieferungen</h1>
    <DokuDate>04.10.2019</DokuDate>
    <h3>1 Ziele</h3>
    <ul>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 6: &quot;Effiziente
        ... Erfassung und Nutzung.&quot;
        <br />
        Die gleichzeitige Lieferung aus vielen Kulturen wird effizienter erfasst
      </li>
      <li>
        Es können Lieferscheine mit mehreren Einzelpositionen erstellt werden
      </li>
    </ul>
    <h3>2 Grund-Idee</h3>
    <ul>
      <li>Lieferungen können mit Hilfe einer Vorlage ausgefüllt werden</li>
      <li>
        Die Daten der Vorlage werden automatisch (oder nach Wahl flexibel mit
        Befehlen) in die zugehörigen (Teil-)Lieferungen kopiert
      </li>
      <li>
        Die BenutzerIn kann wählen, die Daten der Vorlage manuell mit Hilfe von
        Befehlen zu kopieren. So ist es möglich, in einzelnen Feldern /
        Lieferungen von der Vorlage abzuweichen
      </li>
      <li>Die Vorlage wird &quot;Sammel-Lieferung&quot; genannt</li>
    </ul>
    <h3>3 Benutzer-Erlebnis</h3>
    <ul>
      <li>
        <p>
          Benutzer wählt &quot;Neue Sammel-Lieferung&quot; (im Navigations-Baum)
        </p>
      </li>
      <li>
        <p>
          Eine Sammel-Lieferung öffnet sich. Sie entspricht genau dem
          Lieferungs-Formular. Das Label im Baum zeigt erst die ID der
          Sammel-Lieferung an
        </p>
      </li>
      <li>
        <p>
          Benutzer füllt alles aus, was in allen (Teil-)Lieferungen gleich ist.
          Oder anders gesagt: Was in alle (Teil-)Lieferungen kopiert werden soll
        </p>
      </li>
      <li>
        <p>
          Das Label im Baum zeigt nun Daten aus der Sammel-Lieferung, sofern
          vorhanden (Datum, von, wer)
        </p>
      </li>
      <li>
        <p>
          Benutzer erstellt neue Lieferungen. Dabei werden die Daten aus der
          Sammel-Lieferung übernommen
        </p>
      </li>
      <li>
        <p>
          Lieferungen zeigen nur Felder, die in der Sammel-Lieferung noch nicht
          ausgefüllt sind
        </p>
      </li>
      <li>
        <p>
          Benutzer kann wählen, alle Felder anzuzeigen. So können in
          Einzelfällen abweichende Werte erfasst werden, auch wenn dieses Feld
          ansonsten in allen (Teil-)Lieferungen einen anderen Wert enthält
        </p>
      </li>
      <li>
        <p>
          Bei allen (Teil-)Lieferungen von Sammel-Lieferungen wird die
          Sammel-Lieferung angezeigt. Benutzer kann dieses Verhalten ausschalten
        </p>
      </li>
      <li>
        <p>
          Änderungen der Sammel-Lieferung werden automatisch in alle zugehörigen
          Lieferungen kopiert. Benutzer kann stattdessen wählen:
        </p>
        <ul>
          <li>
            Daten der Sammel-Lieferung manuell in einzelne Lieferung kopieren
          </li>
          <li>
            Daten der Sammel-Lieferung manuell in alle Lieferungen kopieren
          </li>
        </ul>
      </li>
      <li>
        <p>Benutzer kann Sammel-Lieferung drucken</p>
      </li>
      <li>
        <p>
          Eventuell: Benutzer kann auch Einzel-Positionen drucken (in allen
          Lieferungs-Formularen)
        </p>
      </li>
    </ul>
  </>
)
