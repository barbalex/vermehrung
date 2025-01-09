import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import styled from '@emotion/styled'
import { useResizeDetector } from 'react-resize-detector'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import DeleteButton from './DeleteButton.jsx'
import AddButton from './AddButton.jsx'
import Anleitung from './Anleitung.jsx'
import FilterNumbers from '../../../shared/FilterNumbers.jsx'
import { HistoryButton } from '../../../shared/HistoryButton.jsx'
import { Menu } from '../../../shared/Menu.jsx'
import UpSvg from '../../../../svg/to_up.svg?react'
import LiDownSvg from '../../../../svg/to_ausli_down.svg?react'
import HeDownSvg from '../../../../svg/to_he_down.svg?react'
import { constants } from '../../../../utils/constants.js'

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

const SammlungFormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(MobxStoreContext)
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

  const { width, ref } = useResizeDetector()

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
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

  return (
    <TitleContainer ref={ref}>
      <Title>Sammlung</Title>
      <TitleSymbols>
        <IconButton
          title="Zur Sammlungs-Liste"
          onClick={onClickUp}
          size="large"
        >
          <UpSvg />
        </IconButton>
        {showToHe && (
          <IconButton
            title="Zu den Herkünften dieser Sammlung"
            onClick={onClickToHerkuenfte}
            size="large"
          >
            <HeDownSvg />
          </IconButton>
        )}
        {showToLi && (
          <IconButton
            title="Zu den Aus-Lieferungen dieser Sammlung"
            onClick={onClickToLieferungen}
            size="large"
          >
            <LiDownSvg />
          </IconButton>
        )}
        <AddButton />
        <DeleteButton row={row} />
        {width < 520 ?
          <Menu white={false}>
            <HistoryButton
              table="sammlung"
              id={row.id}
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
        : <>
            <HistoryButton
              table="sammlung"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
            />
            <Anleitung />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
            />
          </>
        }
      </TitleSymbols>
    </TitleContainer>
  )
}

export default observer(SammlungFormTitle)
