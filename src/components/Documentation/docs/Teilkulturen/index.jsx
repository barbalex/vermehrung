import { Link } from 'react-router'

import { dokuDate } from '../../index.module.css'
import teilkulturOption from './teilkultur_option.gif'
import teilkulturNew from './teilkultur_new.gif'

export const Teilkulturen = () => (
  <>
    <h1>Teil-Kulturen</h1>
    <p className={dokuDate}>20.09.2019</p>
    <p>
      Grössere Gärten oder gärtnerische Betriebe organisieren ihre Kulturen oft
      in Untereinheiten, wie zum Beispiel: &quot;Beete&quot;,
      &quot;Kästen&quot;, &quot;Reihen&quot;.
      <br />
      In vermehrung.ch werden diese Untereinheiten &quot;Teil-Kulturen&quot;
      genannt.
      <br />
      <br />
    </p>
    <h3>1. Ziele</h3>
    <ul>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 3 und 4:
        &quot;Anzahl Pflanzen und Anzahl auspflanz-bereite Pflanzen sind bekannt
        und können geplant werden&quot;, &quot;Anzahl Mutterpflanzen ist
        bekannt.&quot;
        <br />
        In grossen Kulturen erleichtert eine Unterteilung die Erfassung der
        Anzahlen
      </li>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 6: &quot;Effiziente
        und quell-nahe Erfassung und Nutzung.&quot;
        <br />
        In kleinen Kulturen würden Teil-Kulturen bloss ablenken. Darum sind
        Teil-Kulturen &quot;opt-in&quot;, das heisst sie erscheinen erst, wenn
        man sie will (siehe unten)
      </li>
      <li>
        <Link to="/Dokumentation/ziele">Projekt-Ziel</Link> 8: &quot;In grossen
        Gärten haben MitarbeiterInnen die Übersicht über die (räumliche)
        Organisation der Kulturen.&quot;
        <br />
        Bei der Kultur kann ein Teilkultur-Plan als Datei angefügt werden.
        Teil-Kulturen sind so aufgebaut, dass künftig bei Bedarf auch Geometrien
        erfasst werden könnten.
      </li>
    </ul>
    <h3>2. Umsetzung</h3>
    <p>
      Bei Kulturen gibt es die Option &quot;Mit Teil-Kulturen arbeiten&quot;.
      <br />
      <img
        src={teilkulturOption}
        referrerPolicy="no-referrer"
        alt='Option "Mit Teil-Kulturen arbeiten"'
      />
      <br />
      Sie ermöglicht:
      <br />
      <br />
    </p>
    <h4>Es können Teil-Kulturen erfasst werden</h4>
    <p>
      Neben der zugehörigen Kultur wird vorerst nur ein Name erfasst.
      &quot;Name&quot; ist eine simple Methode, damit verschiedene Systeme,
      Untereinheiten zu bilden möglich sind, ohne dass vermehrung.ch eines
      vorgeben muss.
      <br />
      <br />
    </p>
    <p>
      Beispiel: Ein Betrieb hat Beete, darin Kästen und darin Reihen. Es soll
      pro Reihe gezählt werden. Von jeder Kategorie gibt es nie mehr als 99.
      <br />
      In diesem Fall empfiehlt es sich, für den Namen diese drei
      Hierarchiestufen so oder ähnlich zu kombinieren: &quot;02/03/12&quot;. Das
      ist Reihe 12 im Kasten 3 im Beet 2. Auf diese Weise sortieren sich die
      Namen auch wie erwartet.
      <br />
      <br />
    </p>
    <p>
      Um Teil-Kulturen erfassen zu können, erscheint im Navigations-Baum unter
      der Kultur ein neuer Ast. Eine neue Teil-Kultur kann aber auch direkt im
      Feld, in dem man Teil-Kulturen auswählt, erfasst werden: Einfach den neuen
      Wert tippen und &quot;... als neue Teilkultur aufnehmen&quot; wählen.
      <br />
      <img
        src={teilkulturNew}
        referrerPolicy="no-referrer"
        alt="Direkt neue Teilkultur erstellen"
      />
      <br />
      <br />
    </p>
    <h4>Zählungen können pro Teil-Kultur erfasst werden</h4>
    <p>
      Pro Kultur können (fakultativ) mehrere Teil-Zählungen erfasst werden. Die
      Teil-Zählungen können einer Teil-Kultur zugeordnet werden.
      <br />
      vermehrung.ch summiert alle Zahlen der Einheiten &quot;Anzahl
      Pflanzen&quot;, &quot;anzahl auspflanz-bereit&quot; und &quot;Anzahl
      Mutter-Pflanzen&quot; pro Kultur.
      <br />
      <br />
    </p>
    <h4>Events können Teil-Kulturen zugeordnet werden</h4>
    <p>
      ...müssen aber nicht.
      <br />
      <br />
    </p>
    <h4>Kulturen können individuell organisiert werden</h4>
    <p>
      Die Option &quot;Teil-Kulturen&quot; wirkt pro Kultur. Man kann daher in
      jeder Kultur wählen, ob Teil-Kulturen erfasst werden können und nach
      welchem System.
      <br />
      <br />
    </p>
    <h4>Teilkulturen können in drei Stufen zusätzlich beschrieben werden</h4>
    <p>
      ...wozu die Felder &quot;ort1&quot;, &quot;ort2&quot; und &quot;ort3&quot;
      dienen.
    </p>
  </>
)
