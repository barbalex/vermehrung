import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { withResizeDetector } from 'react-resize-detector'

import { StoreContext } from '../../../../models/reactUtils'
import Settings from './Settings'
import AddButton from './AddButton'
import DelteButton from './DeleteButton'
import getConstants from '../../../../utils/constants'
import FilterNumbers from '../../../shared/FilterNumbers'
import UpSvg from '../../../../svg/to_up.inline.svg'

const constants = getConstants()

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: 48px;
  justify-content: space-between;
  padding 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`

const ZaehlungFormTitle = ({
  row,
  totalNr,
  filteredNr,
  width,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const openZaehlungDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Zaehlungen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )

  return (
    <TitleContainer>
      <Title>Zählung</Title>
      <TitleSymbols>
        <IconButton title="Zur Liste" onClick={onClickUp}>
          <UpSvg />
        </IconButton>
        <AddButton />
        <DelteButton row={row} />
        {row.kultur_id && (
          <Settings kulturId={row.kultur_id} zaehlungId={row.id} />
        )}
        <IconButton
          aria-label="Anleitung öffnen"
          title="Anleitung öffnen"
          onClick={openZaehlungDocs}
        >
          <IoMdInformationCircleOutline />
        </IconButton>
        <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default withResizeDetector(observer(ZaehlungFormTitle))
