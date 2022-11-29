import React, { useContext, useCallback } from 'react'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { observer } from 'mobx-react-lite'
import DoubleArrowCrossed from '../../../svg/double_arrow_crossed.inline.svg'
import { FaUndoAlt, FaArrowsAltH } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@mui/material/IconButton'

import Data from '../Conflict/Data'
import StoreContext from '../../../storeContext'
import constants from '../../../utils/constants'

const Container = styled.div`
  padding: 10px;
`
const Title = styled.h4`
  margin-bottom: 0;
`
const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
const StyledIconButton = styled(IconButton)`
  height: 18px;
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

const History = ({ rev, dataArray, onClickWiderspruchUebernehmen }) => {
  const store = useContext(StoreContext)
  const { diffConflict, setDiffConflict } = store

  const onClickToggleDiff = useCallback(
    () => setDiffConflict(!diffConflict),
    [diffConflict, setDiffConflict],
  )
  const openDocs = useCallback(() => {
    const url = `${constants?.getAppUri()}/Dokumentation/Historisierung`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  return (
    <Container>
      <TitleRow>
        <Title>
          Historische Version<Rev>{rev}</Rev>
        </Title>
        <StyledIconButton
          aria-label="Anleitung öffnen"
          title="Anleitung öffnen"
          onClick={openDocs}
          size="small"
        >
          <IoMdInformationCircleOutline />
        </StyledIconButton>
      </TitleRow>
      <Data dataArray={dataArray} />
      <ButtonRow>
        <StyledButton
          onClick={onClickWiderspruchUebernehmen}
          variant="outlined"
          title="Diese Version wiederherstellen"
          startIcon={<FaUndoAlt />}
          color="inherit"
        >
          {diffConflict ? 'grüne Werte wiederherstellen' : 'wiederherstellen'}
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
      </ButtonRow>
    </Container>
  )
}

export default observer(History)
