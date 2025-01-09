import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { useResizeDetector } from 'react-resize-detector'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import Settings from './Settings/index.jsx'
import DeleteButton from './DeleteButton.jsx'
import AddButton from './AddButton.jsx'
import Download from './Download/index.jsx'
import FilterNumbers from '../../../shared/FilterNumbers.jsx'
import UpSvg from '../../../../svg/to_up.svg?react'
import KuDownSvg from '../../../../svg/to_ku_down.svg?react'
import { HistoryButton } from '../../../shared/HistoryButton.jsx'
import Menu from '../../../shared/Menu.jsx'
import { constants } from '../../../../utils/constants.js'

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
  totalCount,
  filteredCount,
}) => {
  const store = useContext(MobxStoreContext)
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

  const { width, ref } = useResizeDetector()

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
  const onClickToKulturen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Kulturen']),
    [activeNodeArray, setActiveNodeArray],
  )

  return (
    <Container ref={ref}>
      <Title>Garten</Title>
      <TitleSymbols>
        <IconButton
          title="Zur Liste"
          onClick={onClickUp}
          size="large"
        >
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
        <DeleteButton
          row={row}
          rawRow={rawRow}
        />
        <Download gartenId={row.id} />
        {width < 520 ?
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
        : <>
            <HistoryButton
              table="garten"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
            />
            <Settings />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
            />
          </>
        }
      </TitleSymbols>
    </Container>
  )
}

export default observer(GartenFormTitle)
