import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { useResizeDetector } from 'react-resize-detector'

import StoreContext from '../../../../mobxStoreContext.js'
import Settings from './Settings/index.jsx'
import AddButton from './AddButton.jsx'
import DeleteButton from './DeleteButton.jsx'
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

const EventFormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

  const { width, ref } = useResizeDetector()

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])

  return (
    <TitleContainer ref={ref}>
      <Title>Event</Title>
      <TitleSymbols>
        <IconButton
          title="Zur Liste"
          onClick={onClickUp}
          size="large"
        >
          <UpSvg />
        </IconButton>
        <AddButton />
        <DeleteButton row={row} />
        {width < 520 ?
          <Menu white={false}>
            <HistoryButton
              table="event"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            {row.kultur_id && (
              <Settings
                kulturId={row.kultur_id}
                asMenu
              />
            )}
            <Anleitung asMenu />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
          </Menu>
        : <>
            <HistoryButton
              table="event"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
            />
            {row.kultur_id && <Settings kulturId={row.kultur_id} />}
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

export default observer(EventFormTitle)
