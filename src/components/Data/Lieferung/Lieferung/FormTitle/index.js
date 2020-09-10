import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'

import { StoreContext } from '../../../../../models/reactUtils'
import FilterTitle from '../../../../shared/FilterTitle'
import Settings from './Settings'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import getConstants from '../../../../../utils/constants'
import FilterNumbers from '../../../../shared/FilterNumbers'
import UpSvg from '../../../../../svg/to_up.inline.svg'
import KuDownSvg from '../../../../../svg/to_ku_down.inline.svg'

const constants = getConstants()

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

const LieferungTitleChooser = ({
  row,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)

  const {
    kulturIdInActiveNodeArray,
    lieferungsFiltered,
    lieferungsSorted,
    personIdInActiveNodeArray,
    sammelLieferungIdInActiveNodeArray,
    sammlungIdInActiveNodeArray,
  } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const hierarchyFilter = (e) => {
    if (kulturIdInActiveNodeArray) {
      if (activeNodeArray.includes('Aus-Lieferungen')) {
        return e.von_kultur_id === kulturIdInActiveNodeArray
      }
      if (activeNodeArray.includes('An-Lieferungen')) {
        return e.nach_kultur_id === kulturIdInActiveNodeArray
      }
    }
    if (sammelLieferungIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return e.sammel_lieferung_id === sammelLieferungIdInActiveNodeArray
    }
    if (personIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return e.person_id === personIdInActiveNodeArray
    }
    if (sammlungIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return e.von_sammlung_id === sammlungIdInActiveNodeArray
    }
    return true
  }

  const totalNr = lieferungsSorted.filter(hierarchyFilter).length
  const filteredNr = lieferungsFiltered.filter(hierarchyFilter).length

  const openLieferungDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Lieferungen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

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

  if (showFilter) {
    return (
      <FilterTitle
        title="Lieferung"
        table="lieferung"
        totalNr={totalNr}
        filteredNr={filteredNr}
      />
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
        <Settings />
        <IconButton
          aria-label="Anleitung öffnen"
          title="Anleitung öffnen"
          onClick={openLieferungDocs}
        >
          <IoMdInformationCircleOutline />
        </IconButton>
        <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default observer(LieferungTitleChooser)
