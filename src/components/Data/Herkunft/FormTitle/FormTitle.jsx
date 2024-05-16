import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { withResizeDetector } from 'react-resize-detector'

import StoreContext from '../../../../storeContext.js'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Settings from './Settings'
import Anleitung from './Anleitung'
import FilterNumbers from '../../../shared/FilterNumbers'
import HistoryButton from '../../../shared/HistoryButton'
import Menu from '../../../shared/Menu'
import UpSvg from '../../../../svg/to_up.svg?react'
import SaDownSvg from '../../../../svg/to_sa_down.svg?react'
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

const Herkunft = ({
  row,
  totalCount,
  filteredCount,
  width,
  showHistory,
  setShowHistory,
  activeConflict,
}) => {
  const store = useContext(StoreContext)
  const {
    activeNodeArray: anaRaw,
    setActiveNodeArray,
    removeOpenNode,
  } = store.tree
  const activeNodeArray = anaRaw.toJSON()

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
  const onClickToSammlungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Sammlungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const showToSa = activeNodeArray[0] === 'Herkuenfte'

  // herkunft is top node
  // never enable adding below that
  const editingAllowed = activeNodeArray.length <= 2

  if (width < 520) {
    return (
      <TitleContainer>
        <Title>{`Herkunft${activeConflict ? ': Konflikt lösen' : ''}`}</Title>
        <TitleSymbols>
          <IconButton title="Zur Liste" onClick={onClickUp} size="large">
            <UpSvg />
          </IconButton>
          {showToSa && (
            <IconButton
              title="Zu den Sammlungen"
              onClick={onClickToSammlungen}
              size="large"
            >
              <SaDownSvg />
            </IconButton>
          )}
          {editingAllowed && (
            <>
              <AddButton />
              <DeleteButton row={row} />
            </>
          )}
          <Menu white={false}>
            <HistoryButton
              table="herkunft"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            <Anleitung asMenu />
            <Settings asMenu />
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
      <Title>{`Herkunft${activeConflict ? ': Konflikt lösen' : ''}`}</Title>
      <TitleSymbols>
        <IconButton title="Zur Liste" onClick={onClickUp} size="large">
          <UpSvg />
        </IconButton>
        {showToSa && (
          <IconButton
            title="Zu den Sammlungen"
            onClick={onClickToSammlungen}
            size="large"
          >
            <SaDownSvg />
          </IconButton>
        )}
        {editingAllowed && (
          <>
            <AddButton />
            <DeleteButton row={row} />
          </>
        )}
        <HistoryButton
          table="herkunft"
          id={row.id}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        <Anleitung />
        <Settings />
        <FilterNumbers filteredCount={filteredCount} totalCount={totalCount} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default withResizeDetector(observer(Herkunft))
