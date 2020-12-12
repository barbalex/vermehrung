import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

import { StoreContext } from '../../../../models/reactUtils'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Anleitung from './Anleitung'
import FilterNumbers from '../../../shared/FilterNumbers'
import HistoryButton from '../../../shared/HistoryButton'
import Menu from '../../../shared/Menu'
import UpSvg from '../../../../svg/to_up.inline.svg'
import LiDownSvg from '../../../../svg/to_ausli_down.inline.svg'
import HeDownSvg from '../../../../svg/to_he_down.inline.svg'

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

const SammlungFormTitle = ({
  row,
  totalCount,
  filteredCount,
  width,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToLieferungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Aus-Lieferungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToHerkuenfte = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Herkuenfte']),
    [activeNodeArray, setActiveNodeArray],
  )
  const showToHe = activeNodeArray[0] === 'Sammlungen'
  const showToLi = activeNodeArray[0] !== 'Personen'

  if (width < 520) {
    return (
      <TitleContainer>
        <Title>Sammlung</Title>
        <TitleSymbols>
          <IconButton title="Zur Sammlungs-Liste" onClick={onClickUp}>
            <UpSvg />
          </IconButton>
          {showToHe && (
            <IconButton
              title="Zu den Herkünften dieser Sammlung"
              onClick={onClickToHerkuenfte}
            >
              <HeDownSvg />
            </IconButton>
          )}
          {showToLi && (
            <IconButton
              title="Zu den Aus-Lieferungen dieser Sammlung"
              onClick={onClickToLieferungen}
            >
              <LiDownSvg />
            </IconButton>
          )}
          <AddButton />
          <DeleteButton row={row} />
          <Menu white={false}>
            <HistoryButton
              row={row}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
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
      <Title>Sammlung</Title>
      <TitleSymbols>
        <IconButton title="Zur Sammlungs-Liste" onClick={onClickUp}>
          <UpSvg />
        </IconButton>
        {showToHe && (
          <IconButton
            title="Zu den Herkünften dieser Sammlung"
            onClick={onClickToHerkuenfte}
          >
            <HeDownSvg />
          </IconButton>
        )}
        {showToLi && (
          <IconButton
            title="Zu den Aus-Lieferungen dieser Sammlung"
            onClick={onClickToLieferungen}
          >
            <LiDownSvg />
          </IconButton>
        )}
        <AddButton />
        <DeleteButton row={row} />
        <HistoryButton
          row={row}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        <Anleitung />
        <FilterNumbers filteredCount={filteredCount} totalCount={totalCount} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default withResizeDetector(observer(SammlungFormTitle))
