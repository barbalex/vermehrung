import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { withResizeDetector } from 'react-resize-detector'

import DeleteButton from './DeleteButton.jsx'
import AddButton from './AddButton.jsx'
import NavButtons from './NavButtons.jsx'
import FilterNumbers from '../../../shared/FilterNumbers.jsx'
import Menu from '../../../shared/Menu.jsx'
import HistoryButton from '../../../shared/HistoryButton'
import constants from '../../../../utils/constants.js'

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
  margin-left: 10px;
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
