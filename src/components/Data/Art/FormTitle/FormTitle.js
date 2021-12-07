import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import NavButtons from './NavButtons'
import FilterNumbers from '../../../shared/FilterNumbers'
import Menu from '../../../shared/Menu'
import HistoryButton from '../../../shared/HistoryButton'
import getConstants from '../../../../utils/constants'

const constants = getConstants()

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: ${constants.titleRowHeight}px;
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

const Art = ({
  row,
  totalCount,
  filteredCount,
  width,
  showHistory,
  setShowHistory,
}) => {
  if (width < 520) {
    return (
      <TitleContainer>
        <Title>Art</Title>
        <TitleSymbols>
          <NavButtons />
          <AddButton />
          <DeleteButton row={row} />
          <Menu white={false}>
            <HistoryButton
              table="art"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
          </Menu>
        </TitleSymbols>
      </TitleContainer>
    )
  }

  return (
    <TitleContainer>
      <Title>Art</Title>
      <TitleSymbols>
        <NavButtons />
        <AddButton />
        <DeleteButton row={row} />
        <HistoryButton
          table="art"
          id={row.id}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        <FilterNumbers filteredCount={filteredCount} totalCount={totalCount} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default withResizeDetector(observer(Art))
