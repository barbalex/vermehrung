import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { StoreContext } from '../../../../models/reactUtils'
import Settings from './Settings'
import Copy from './Copy'
import Add from './Add'
import Delete from './Delete'
import FilterNumbers from '../../../shared/FilterNumbers'
import NavButtons from './NavButtons'
import PrintButtons from './PrintButtons'
import Anleitung from './Anleitung'

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

const SammelLieferungFormTitle = ({
  showFilter,
  row,
  totalNr,
  filteredNr,
  lieferungId,
  printPreview,
  setPrintPreview,
}) => {
  const store = useContext(StoreContext)

  const { filter, userPersonOption } = store
  const { activeNodeArray } = store.tree
  const { sl_auto_copy_edits } = userPersonOption

  const shownAsSammelLieferung =
    activeNodeArray.length === 2 && activeNodeArray[0] === 'Sammel-Lieferungen'

  if (!row || (!showFilter && filter.show)) return null

  return (
    <TitleContainer>
      <Title>Sammel-Lieferung</Title>
      <TitleSymbols>
        {shownAsSammelLieferung && (
          <>
            <NavButtons />
            <Add />
            <Delete row={row} />
            <PrintButtons
              printPreview={printPreview}
              setPrintPreview={setPrintPreview}
            />
          </>
        )}
        {!sl_auto_copy_edits && (
          <Copy sammelLieferung={row} lieferungId={lieferungId} />
        )}
        <>
          {row.id && <Settings />}
          <Anleitung />
          {shownAsSammelLieferung && (
            <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
          )}
        </>
      </TitleSymbols>
    </TitleContainer>
  )
}

export default observer(SammelLieferungFormTitle)