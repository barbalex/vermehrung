import React, { useContext, useCallback } from 'react'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { observer } from 'mobx-react-lite'
import {
  FaTimes,
  FaExchangeAlt,
  FaRegTrashAlt,
  FaArrowsAltH,
} from 'react-icons/fa'

import DoubleArrowCrossed from '../../../svg/double_arrow_crossed.svg?react'
import Explainer from './Explainer'
import Data from './Data'
import StoreContext from '../../../storeContext'

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

const Conflict = ({
  name,
  rev,
  dataArray,
  loading,
  error,
  onClickAktuellUebernehmen,
  onClickWiderspruchUebernehmen,
  onClickSchliessen,
}) => {
  const store = useContext(StoreContext)
  const { diffConflict, setDiffConflict } = store

  const onClickToggleDiff = useCallback(
    () => setDiffConflict(!diffConflict),
    [diffConflict, setDiffConflict],
  )

  if (error) {
    return <Container>{error.message}</Container>
  }

  return (
    <Container>
      <Title>
        Widersprüchliche Version<Rev>{rev}</Rev>
      </Title>
      <Explainer name={name} />
      <Data dataArray={dataArray} loading={loading} />
      <ButtonRow>
        <StyledButton
          onClick={onClickAktuellUebernehmen}
          variant="outlined"
          title="Die widersprüchliche Version wird verworfen, die aktuelle beibehalten. Der Konflikt gilt als gelöst und erscheint nicht mehr"
          startIcon={<FaRegTrashAlt />}
          color="inherit"
        >
          {diffConflict
            ? 'grüne (= aktuelle) Version übernehmen'
            : 'aktuelle Version übernehmen'}
        </StyledButton>
        <StyledButton
          onClick={onClickWiderspruchUebernehmen}
          variant="outlined"
          title="Die widersprüchliche Version wird übernommen, die aktuelle verworfen. Der Konflikt gilt als gelöst und erscheint nicht mehr"
          startIcon={<FaExchangeAlt />}
          color="inherit"
        >
          {diffConflict
            ? 'rote (= widersprüchliche) Version übernehmen'
            : 'widersprüchliche Version übernehmen'}
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
          color="inherit"
        >
          {diffConflict ? 'nicht vergleichen' : 'vergleichen'}
        </StyledButton>
        <StyledButton
          onClick={onClickSchliessen}
          variant="outlined"
          title="Die Spalte mit dem Konflikt wird geschlossen. Der Konflikt bleibt erhalten"
          startIcon={<FaTimes />}
          color="inherit"
        >
          schliessen
        </StyledButton>
      </ButtonRow>
    </Container>
  )
}

export default observer(Conflict)
