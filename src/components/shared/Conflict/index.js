import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { observer } from 'mobx-react-lite'

import ConflictExplainer from './Explainer'
import ConflictData from './Data'

const Container = styled.div`
  padding: 10px;
`
const Title = styled.h4`
  margin-bottom: 10px;
`
const Rev = styled.span`
  font-weight: normal;
  padding-left: 7px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8em;
`
const ButtonRow = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-evenly;
`
const StyledButton = styled(Button)`
  > span {
    text-transform: none;
  }
`

const Conflict = ({
  rev,
  row,
  dataArray,
  loading,
  error,
  onClickVerwerfen,
  onClickUebernehmen,
  onClickSchliessen,
}) => {
  if (error) {
    return <Container>{error.message}</Container>
  }

  return (
    <Container>
      <Title>
        Widersprüchliche Version<Rev>{rev}</Rev>
      </Title>
      <ConflictExplainer name="Herkunft" />
      <ConflictData dataArray={dataArray} row={row} loading={loading} />
      <ButtonRow>
        <StyledButton
          onClick={onClickVerwerfen}
          variant="outlined"
          title="Der Konflikt gilt er als gelöst und erscheint nicht mehr"
        >
          verwerfen
        </StyledButton>
        <StyledButton
          onClick={onClickUebernehmen}
          variant="outlined"
          title="Die widersprüchliche Version wird zur aktuellen. Die bisher aktuelle wird zur widersprüchlichen"
        >
          übernehmen
        </StyledButton>
        <StyledButton
          onClick={onClickSchliessen}
          variant="outlined"
          title="Die Spalte mit dem Konflikt wird geschlossen. Der Konflikt bleibt erhalten"
        >
          schliessen
        </StyledButton>
      </ButtonRow>
    </Container>
  )
}

export default observer(Conflict)
