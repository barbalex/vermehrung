import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { withResizeDetector } from 'react-resize-detector'

import StoreContext from '../../../../storeContext.js'
import Settings from './Settings'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Download from './Download'
import FilterNumbers from '../../../shared/FilterNumbers'
import UpSvg from '../../../../svg/to_up.svg?react'
import KuDownSvg from '../../../../svg/to_ku_down.svg?react'
import HistoryButton from '../../../shared/HistoryButton'
import Menu from '../../../shared/Menu'
import constants from '../../../../utils/constants.js'

const Container = styled.div`
  background-color:rgba(74, 20, 140, 0.1);
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

const GartenFormTitle = ({
  row,
  rawRow,
  showHistory,
  setShowHistory,
  width,
  totalCount,
  filteredCount,
}) => {
  const store = useContext(StoreContext)
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
  const onClickToKulturen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Kulturen']),
    [activeNodeArray, setActiveNodeArray],
  )

  if (width < 520) {
    return (
      <Container>
        <Title>Garten</Title>
        <TitleSymbols>
          <IconButton title="Zur Liste" onClick={onClickUp} size="large">
            <UpSvg />
          </IconButton>
          <IconButton
            title="Zu den Kulturen"
            onClick={onClickToKulturen}
            size="large"
          >
            <KuDownSvg />
          </IconButton>
          <AddButton />
          <DeleteButton row={row} rawRow={rawRow} />
          <Download gartenId={row.id} />
          <Menu white={false}>
            <HistoryButton
              table="garten"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            <Settings asMenu />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
          </Menu>
        </TitleSymbols>
      </Container>
    )
  }

  return (
    <Container>
      <Title>Garten</Title>
      <TitleSymbols>
        <IconButton title="Zur Liste" onClick={onClickUp} size="large">
          <UpSvg />
        </IconButton>
        <IconButton
          title="Zu den Kulturen"
          onClick={onClickToKulturen}
          size="large"
        >
          <KuDownSvg />
        </IconButton>
        <AddButton />
        <DeleteButton row={row} />
        <Download gartenId={row.id} />
        <HistoryButton
          table="garten"
          id={row.id}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        <Settings />
        <FilterNumbers filteredCount={filteredCount} totalCount={totalCount} />
      </TitleSymbols>
    </Container>
  )
}

export default withResizeDetector(observer(GartenFormTitle))
