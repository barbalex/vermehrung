import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { observer } from 'mobx-react-lite'
import DoubleArrowCrossed from '../../../svg/double_arrow_crossed.inline.svg'
import { FaTimes, FaExchangeAlt, FaArrowsAltH } from 'react-icons/fa'

import Data from '../Conflict/Data'
import { StoreContext } from '../../../models/reactUtils'

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
  padding: 15px 0;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`
const StyledButton = styled(Button)`
  margin: 5px !important;
  > span {
    text-transform: none;
  }
`

const History = ({ rev, dataArray, onClickUebernehmen, onClickSchliessen }) => {
  const store = useContext(StoreContext)
  const { diffConflict, setDiffConflict } = store

  const onClickToggleDiff = useCallback(() => setDiffConflict(!diffConflict), [
    diffConflict,
    setDiffConflict,
  ])

  return (
    <Container>
      <Title>
        Historische Version<Rev>{rev}</Rev>
      </Title>
      <Data dataArray={dataArray} />
      <ButtonRow>
        <StyledButton
          onClick={onClickUebernehmen}
          variant="outlined"
          title="Die historische Version wird zur aktuellen. Die bisher aktuelle wird zur widersprüchlichen"
          startIcon={<FaExchangeAlt />}
        >
          übernehmen
        </StyledButton>
        <StyledButton
          onClick={onClickToggleDiff}
          variant="outlined"
          title={
            diffConflict
              ? 'Versionen nicht vergleichen'
              : 'Versionen vergleichen'
          }
          startIcon={diffConflict ? <DoubleArrowCrossed /> : <FaArrowsAltH />}
        >
          {diffConflict ? 'nicht vergleichen' : 'vergleichen'}
        </StyledButton>
        <StyledButton
          onClick={onClickSchliessen}
          variant="outlined"
          title="Die Spalte mit der historischen Version wird geschlossen"
          startIcon={<FaTimes />}
        >
          schliessen
        </StyledButton>
      </ButtonRow>
    </Container>
  )
}

export default observer(History)
