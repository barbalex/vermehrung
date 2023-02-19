import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { withResizeDetector } from 'react-resize-detector'

import StoreContext from '../../../../../storeContext'
import Settings from './Settings'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import Anleitung from './Anleitung'
import FilterNumbers from '../../../../shared/FilterNumbers'
import HistoryButton from '../../../../shared/HistoryButton'
import Menu from '../../../../shared/Menu'
import { ReactComponent as UpSvg } from '../../../../../svg/to_up.inline.svg'
import { ReactComponent as KuDownSvg } from '../../../../../svg/to_ku_down.inline.svg'
import constants from '../../../../../utils/constants'

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

const LieferungTitleFormTitle = ({
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
  const nachKulturId = row?.nach_kultur_id
  const onClickToKultur = useCallback(
    () =>
      setActiveNodeArray([
        ...activeNodeArray.filter((n) => n !== 'Kulturen'),
        'Kulturen',
        nachKulturId,
      ]),
    [activeNodeArray, nachKulturId, setActiveNodeArray],
  )
  // to kulturen is not implemented in nodes, so turned off
  const showToKu = false && activeNodeArray[0] === 'Sammlungen'

  if (width < 520) {
    return (
      <TitleContainer>
        <Title>Lieferung</Title>
        <TitleSymbols>
          <IconButton title="Zur Liste" onClick={onClickUp} size="large">
            <UpSvg />
          </IconButton>
          {showToKu && (
            <IconButton
              title="Zur Kultur"
              onClick={onClickToKultur}
              size="large"
            >
              <KuDownSvg />
            </IconButton>
          )}
          <AddButton />
          <DeleteButton row={row} />
          <Menu white={false}>
            <HistoryButton
              table="lieferung"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            <Settings asMenu />
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
      <Title>Lieferung</Title>
      <TitleSymbols>
        <IconButton title="Zur Liste" onClick={onClickUp} size="large">
          <UpSvg />
        </IconButton>
        {showToKu && (
          <IconButton title="Zur Kultur" onClick={onClickToKultur} size="large">
            <KuDownSvg />
          </IconButton>
        )}
        <AddButton />
        <DeleteButton row={row} />
        <HistoryButton
          table="lieferung"
          id={row.id}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        <Settings />
        <Anleitung />
        <FilterNumbers filteredCount={filteredCount} totalCount={totalCount} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default withResizeDetector(observer(LieferungTitleFormTitle))
