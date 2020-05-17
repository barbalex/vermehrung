import React from 'react'
import styled from 'styled-components'

const ExplainText = styled.div`
  margin-bottom: 10px;
  li {
    margin-bottom: 0;
  }
`
const OptionalHelp = styled.details`
  margin-bottom: 10px;
`
const Summary = styled.summary`
  user-select: none;
  padding-bottom: 5px;
  &:focus {
    outline: none !important;
  }
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`
const Details = styled.div`
  padding-left: 17px;
`

const ConflictExplainer = ({ name }) => (
  <OptionalHelp>
    <Summary>Infos und Anleitung</Summary>
    <Details>
      <ExplainText>
        {`Es gibt einen Konflikt zwischen der aktuellen Version der ${name}
            und der unten angezeigten widersprüchlichen.`}
      </ExplainText>
      <ExplainText>
        Konflikte können entstehen, wenn:
        <ul>
          <li>
            zwei Personen
            <br /> oder eine Person an verschiedenen Geräten
          </li>
          <li>
            gleichzeitig <br />
            oder während mindestens eine der Personen offline ist
          </li>
        </ul>
        {`...an derselben ${name} arbeiten.`}
      </ExplainText>
      <ExplainText>
        Es können rasch viele Versionen entstehen, weil vermehrung.ch nach jeder
        Eingabe in ein Feld eine neue Version speichert.
      </ExplainText>
      <ExplainText>
        {`vermehrung.ch hat den Konflikt erkannt und automatisch eine Version
            zum Gewinner erklärt. Das ist die "aktuelle" Version.`}
      </ExplainText>
      <ExplainText>
        vermehrung.ch weiss aber nicht, ob die aktuelle Version auch korrekt
        ist. Darum müssen Sie den Konflikt bereinigen:
      </ExplainText>
      <ul>
        <li>
          Passen Sie die aktuelle Version wenn nötig an und verwerfen Sie
          anschliessend die widersprüchliche
        </li>
        <li>
          Oder: Übernehmen Sie widersprüchliche Version. Sie wird damit zur
          aktuellen, die bisher aktuelle wird zur widersprüchlichen.
          <br />
          Anschliessend können Sie die aktuelle Version wenn nötig anpassen und
          die widersprüchliche verwerfen
        </li>
      </ul>
    </Details>
  </OptionalHelp>
)

export default ConflictExplainer
