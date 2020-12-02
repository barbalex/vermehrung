import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

import { StoreContext } from '../../../../models/reactUtils'
import Settings from './Settings'
import Copy from './Copy'
import Add from './Add'
import Delete from './Delete'
import FilterNumbers from '../../../shared/FilterNumbers'
import Menu from '../../../shared/Menu'
import HistoryButton from '../../../shared/HistoryButton'
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
  lieferung,
  printPreview,
  setPrintPreview,
  width,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)

  const { filter, userPersonOption } = store
  const { activeNodeArray } = store.tree
  const { sl_auto_copy_edits } = userPersonOption

  const shownAsSammelLieferung =
    activeNodeArray.length === 2 && activeNodeArray[0] === 'Sammel-Lieferungen'

  if (!row || (!showFilter && filter.show)) return null

  if (width < 515) {
    return (
      <TitleContainer>
        <Title>Sammel-Lieferung</Title>
        <TitleSymbols>
          {shownAsSammelLieferung && (
            <>
              <NavButtons />
              <Add />
              <Delete row={row} />
            </>
          )}
          {!sl_auto_copy_edits && (
            <Copy sammelLieferung={row} lieferung={lieferung} asMenu />
          )}
          <>
            <Menu white={false}>
              <PrintButtons
                printPreview={printPreview}
                setPrintPreview={setPrintPreview}
                asMenu
              />
              <Anleitung asMenu />
              <HistoryButton
                row={row}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                asMenu
              />
              {row.id && <Settings asMenu />}
              {shownAsSammelLieferung && (
                <FilterNumbers
                  filteredNr={filteredNr}
                  totalNr={totalNr}
                  asMenu
                />
              )}
            </Menu>
          </>
        </TitleSymbols>
      </TitleContainer>
    )
  }

  if (width < 563) {
    return (
      <TitleContainer>
        <Title>Sammel-Lieferung</Title>
        <TitleSymbols>
          {shownAsSammelLieferung && (
            <>
              <NavButtons />
              <Add />
              <Delete row={row} />
            </>
          )}
          {!sl_auto_copy_edits && (
            <Copy sammelLieferung={row} lieferung={lieferung} asMenu />
          )}
          <>
            <PrintButtons
              printPreview={printPreview}
              setPrintPreview={setPrintPreview}
            />
            <Menu white={false}>
              <HistoryButton
                row={row}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                asMenu
              />
              {row.id && <Settings asMenu />}
              <Anleitung asMenu />
              {shownAsSammelLieferung && (
                <FilterNumbers
                  filteredNr={filteredNr}
                  totalNr={totalNr}
                  asMenu
                />
              )}
            </Menu>
          </>
        </TitleSymbols>
      </TitleContainer>
    )
  }

  if (width < 610) {
    return (
      <TitleContainer>
        <Title>Sammel-Lieferung</Title>
        <TitleSymbols>
          {shownAsSammelLieferung && (
            <>
              <NavButtons />
              <Add />
              <Delete row={row} />
            </>
          )}
          {!sl_auto_copy_edits && (
            <Copy sammelLieferung={row} lieferung={lieferung} asMenu />
          )}
          <PrintButtons
            printPreview={printPreview}
            setPrintPreview={setPrintPreview}
          />
          <HistoryButton
            row={row}
            showHistory={showHistory}
            setShowHistory={setShowHistory}
          />
          <>
            <Menu white={false}>
              {row.id && <Settings asMenu />}
              <Anleitung asMenu />
              {shownAsSammelLieferung && (
                <FilterNumbers
                  filteredNr={filteredNr}
                  totalNr={totalNr}
                  asMenu
                />
              )}
            </Menu>
          </>
        </TitleSymbols>
      </TitleContainer>
    )
  }

  if (width < 657) {
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
            <Copy sammelLieferung={row} lieferung={lieferung} />
          )}
          <HistoryButton
            row={row}
            showHistory={showHistory}
            setShowHistory={setShowHistory}
          />
          {row.id && <Settings />}
          <>
            <Menu white={false}>
              <Anleitung asMenu />
              {shownAsSammelLieferung && (
                <FilterNumbers
                  filteredNr={filteredNr}
                  totalNr={totalNr}
                  asMenu
                />
              )}
            </Menu>
          </>
        </TitleSymbols>
      </TitleContainer>
    )
  }

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
          <Copy sammelLieferung={row} lieferung={lieferung} />
        )}
        <>
          <HistoryButton
            row={row}
            showHistory={showHistory}
            setShowHistory={setShowHistory}
          />
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

export default withResizeDetector(observer(SammelLieferungFormTitle))
