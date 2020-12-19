import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { withResizeDetector } from 'react-resize-detector'

import StoreContext from '../../../../../storeContext'
import Settings from './Settings'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import Anleitung from './Anleitung'
import FilterNumbers from '../../../../shared/FilterNumbers'
import HistoryButton from '../../../../shared/HistoryButton'
import Menu from '../../../../shared/Menu'
import UpSvg from '../../../../../svg/to_up.inline.svg'
import KuDownSvg from '../../../../../svg/to_ku_down.inline.svg'

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

const LieferungTitleFormTitle = ({
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
  const showToKu = activeNodeArray[0] === 'Sammlungen'

  if (width < 520) {
    return (
      <TitleContainer>
        <Title>Lieferung</Title>
        <TitleSymbols>
          <IconButton title="Zur Liste" onClick={onClickUp}>
            <UpSvg />
          </IconButton>
          {showToKu && (
            <IconButton title="Zur Kultur" onClick={onClickToKultur}>
              <KuDownSvg />
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
        <IconButton title="Zur Liste" onClick={onClickUp}>
          <UpSvg />
        </IconButton>
        {showToKu && (
          <IconButton title="Zur Kultur" onClick={onClickToKultur}>
            <KuDownSvg />
          </IconButton>
        )}
        <AddButton />
        <DeleteButton row={row} />
        <HistoryButton
          row={row}
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
