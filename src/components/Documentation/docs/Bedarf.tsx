import dokuStyles from '../index.module.css'

export const Bedarf = () => (
  <>
    <h1>Bedarf</h1>
    <p className={dokuStyles.dokuDate}>20.10.2026</p>
    <h3>Ziele</h3>
    <ul>
      <li>
        Artverantwortliche können pro Jahr und Kultur melden, wie viel Material
        sie benötigen.
      </li>
      <li>
        Die Gärtnereien können den Bedarf in der jährlichen Bedarfsplanung
        berücksichtigen.
      </li>
    </ul>
    <h3>Umsetzung</h3>
    <p>
      Pro Kultur und Jahr wird ein Bedarf erfasst: Die Beschreibung enthält die
      Mengenangabe, z.B. &quot;Samen&quot;, &quot;Knöllchen&quot;,
      &quot;Töpfe&quot; oder &quot;50-100&quot;. Zusätzlich können Bemerkungen
      und Angaben zu neuem Material erfasst werden.
    </p>
    <p>
      Der Bedarf ersetzt die bisherigen Events: Bestehende Events wurden in
      Bedarf-Einträge migriert.
    </p>
    <p>
      Die Bedarfsangaben fliessen in den Export &quot;aktueller Stand Kulturen
      für die Bedarfsplanung&quot; ein.
    </p>
  </>
)
