import {
  explainText,
  optionalHelp,
  summary,
  details,
  ul,
} from './Explainer.module.css'

export const Explainer = ({ name }) => (
  <details className={optionalHelp}>
    <summary className={summary}>Infos und Anleitung</summary>
    <div className={details}>
      <div className={explainText}>
        {`Es gibt einen Konflikt zwischen der aktuellen Version der/des ${name}
            und der unten angezeigten widersprüchlichen.`}
      </div>
      <div className={explainText}>
        Konflikte können entstehen, wenn:
        <ul className={ul}>
          <li>
            zwei Personen
            <br /> oder eine Person an verschiedenen Geräten
          </li>
          <li>
            gleichzeitig <br />
            oder während mindestens eine der Personen offline ist
          </li>
        </ul>
        {`...an der-/demselben ${name} arbeiten.`}
      </div>
      <div className={explainText}>
        Es können rasch viele Versionen entstehen, weil vermehrung.ch nach jeder
        Eingabe in ein Feld eine neue Version speichert.
      </div>
      <div className={explainText}>
        {`vermehrung.ch hat den Konflikt erkannt und automatisch eine Version
            zum Gewinner erklärt. Das ist die "aktuelle" Version.`}
      </div>
      <div className={explainText}>
        vermehrung.ch weiss aber nicht, ob die aktuelle Version auch korrekt
        ist. Darum müssen Sie den Konflikt bereinigen:
      </div>
      <ul className={ul}>
        <li>
          Passen Sie die aktuelle Version wenn nötig an und verwerfen Sie
          anschliessend die widersprüchliche
        </li>
        <li>Oder: Übernehmen Sie die widersprüchliche Version</li>
      </ul>
    </div>
  </details>
)
