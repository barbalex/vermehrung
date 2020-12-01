import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

import { StoreContext } from '../../../../models/reactUtils'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import FilterNumbers from '../../../shared/FilterNumbers'
import Menu from '../../../shared/Menu'
import HistoryButton from '../../../shared/HistoryButton'
import KontoMenu from './KontoMenu'
import NavButtons from './NavButtons'

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

const PersonFormTitle = ({
  row,
  totalNr,
  filteredNr,
  width,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { userRole } = store

  if (width < 568) {
    return (
      <TitleContainer>
        <Title>Person</Title>
        <TitleSymbols>
          <NavButtons />
          {userRole === 'manager' && (
            <>
              <AddButton />
              <DeleteButton row={row} />
            </>
          )}
          <Menu white={false}>
            <HistoryButton
              row={row}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            <KontoMenu row={row} asMenu />
            <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} asMenu />
          </Menu>
        </TitleSymbols>
      </TitleContainer>
    )
  }

  return (
    <TitleContainer>
      <Title>Person</Title>
      <TitleSymbols>
        <NavButtons />
        {userRole === 'manager' && (
          <>
            <AddButton />
            <DeleteButton row={row} />
          </>
        )}
        <HistoryButton
          row={row}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        <KontoMenu row={row} />
        <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default withResizeDetector(observer(PersonFormTitle))
