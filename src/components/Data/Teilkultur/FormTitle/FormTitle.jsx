import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { withResizeDetector } from 'react-resize-detector'

import StoreContext from '../../../../storeContext.js'
import Settings from './Settings/index.jsx'
import DeleteButton from './DeleteButton.jsx'
import AddButton from './AddButton.jsx'
import Anleitung from './Anleitung.jsx'
import FilterNumbers from '../../../shared/FilterNumbers.jsx'
import HistoryButton from '../../../shared/HistoryButton.jsx'
import Menu from '../../../shared/Menu.jsx'
import UpSvg from '../../../../svg/to_up.svg?react'
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

const TeilkulturFormTitle = ({
  row,
  totalCount,
  filteredCount,
  width,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])

  if (width < 520) {
    return (
      <TitleContainer>
        <Title>Teilkultur</Title>
        <TitleSymbols>
          <IconButton title="Zur Liste" onClick={onClickUp} size="large">
            <UpSvg />
          </IconButton>
          <AddButton />
          <DeleteButton row={row} />
          <Menu white={false}>
            <HistoryButton
              table="teilkultur"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            <Settings kulturId={row.kultur_id} asMenu />
            <Anleitung asMenu />
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
      <Title>Teilkultur</Title>
      <TitleSymbols>
        <IconButton title="Zur Liste" onClick={onClickUp} size="large">
          <UpSvg />
        </IconButton>
        <AddButton />
        <DeleteButton row={row} />
        <HistoryButton
          table="teilkultur"
          id={row.id}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        <Settings kulturId={row.kultur_id} />
        <Anleitung />
        <FilterNumbers filteredCount={filteredCount} totalCount={totalCount} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default withResizeDetector(observer(TeilkulturFormTitle))
