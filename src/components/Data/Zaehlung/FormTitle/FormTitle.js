import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import { withResizeDetector } from 'react-resize-detector'

import StoreContext from '../../../../storeContext'
import Settings from './Settings'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import FilterNumbers from '../../../shared/FilterNumbers'
import HistoryButton from '../../../shared/HistoryButton'
import Menu from '../../../shared/Menu'
import Anleitung from './Anleitung'
import UpSvg from '../../../../svg/to_up.inline.svg'
import constants from '../../../../utils/constants'

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

const ZaehlungFormTitle = ({
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
        <Title>Zählung</Title>
        <TitleSymbols>
          <IconButton title="Zur Liste" onClick={onClickUp} size="large">
            <UpSvg />
          </IconButton>
          <AddButton />
          <DeleteButton row={row} />
          <Menu white={false}>
            <HistoryButton
              table="zaehlung"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            {row.kultur_id && <Settings kulturId={row.kultur_id} asMenu />}
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
      <Title>Zählung</Title>
      <TitleSymbols>
        <IconButton title="Zur Liste" onClick={onClickUp} size="large">
          <UpSvg />
        </IconButton>
        <AddButton />
        <DeleteButton row={row} />
        <HistoryButton
          table="zaehlung"
          id={row.id}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        {row.kultur_id && <Settings kulturId={row.kultur_id} />}
        <Anleitung />
        <FilterNumbers filteredCount={filteredCount} totalCount={totalCount} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default withResizeDetector(observer(ZaehlungFormTitle))
