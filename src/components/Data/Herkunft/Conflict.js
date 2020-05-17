import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 10px;
`
const Title = styled.h4`
  margin-bottom: 10px;
`
const ExplainText = styled.p`
  margin-bottom: 10px;
`

const Conflict = ({ rev }) => {
  return (
    <Container>
      <Title>Widersprüchliche Version</Title>
      <ExplainText>
        Es gibt einen Konflikt zwischen der aktuellen Version der Herkunft und
        dieser widersprüchlichen Version.
      </ExplainText>
      <ExplainText>
        Konflikte können entstehen, wenn zwei Personen gleichzeitig oder offline
        arbeiten. Oder eine Person an verschiedenen Geräten.
      </ExplainText>
      <ExplainText>Um den Konflikt zu bereinigen:</ExplainText>
      <ul>
        <li>
          Passen Sie die aktuelle Version an (wenn nötig) und verwerfen Sie
          anschliessend die widersprüchliche Version
        </li>
        <li>
          Oder: Übernehmen Sie diese widersprüchliche Version. Sie wird damit
          zur aktuellen Version, die bisher aktuelle Version wird zur
          widersprüchlichen. Anschliessend können Sie die (neu) aktuelle Version
          wenn nötig anpassen und die widersprüchliche verwerfen
        </li>
      </ul>
      <div>{`Konflikt ${rev}`}</div>
    </Container>
  )
}

export default Conflict
