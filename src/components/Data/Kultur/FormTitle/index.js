import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import uniq from 'lodash/uniq'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../../models/reactUtils'
import Settings from './Settings'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import FilterNumbers from '../../../shared/FilterNumbers'
import getConstants from '../../../../utils/constants'
import ZaDownSvg from '../../../../svg/to_za_down.inline.svg'
import AnLiDownSvg from '../../../../svg/to_anli_down.inline.svg'
import AusLiDownSvg from '../../../../svg/to_ausli_down.inline.svg'
import EvDownSvg from '../../../../svg/to_ev_down.inline.svg'
import TkDownSvg from '../../../../svg/to_tk_down.inline.svg'
import UpSvg from '../../../../svg/to_up.inline.svg'
import Download from './Download'

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

const Kultur = ({ row }) => {
  const store = useContext(StoreContext)
  const {
    filter,
    gartenIdInActiveNodeArray,
    artIdInActiveNodeArray,
    kultursSorted,
    kultursFiltered,
    sammlungsSorted,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const isFiltered = runIsFiltered()

  const hierarchyFilter = (e) => {
    if (gartenIdInActiveNodeArray) {
      return e.garten_id === gartenIdInActiveNodeArray
    }
    if (artIdInActiveNodeArray) {
      return e.art_id === artIdInActiveNodeArray
    }
    return true
  }

  // From all collected combinations of art and herkunft show only arten of those not present in this garten
  // => find all combinations of art and herkunft in sammlungen
  // => substract the ones existing in this garden
  // => present arten of the rest
  const artHerkunftInGarten = (row?.garten?.kulturs ?? [])
    // only consider kulturen with both art and herkunft chosen
    .filter((o) => o.art_id && o.herkunft_id)
  const sammlungs = sammlungsSorted.filter((s) => !!s.art_id && !!s.herkunft_id)
  const artHerkunftToChoose = sammlungs.filter(
    (s) =>
      !artHerkunftInGarten.find(
        (a) => a.art_id === s.art_id && a.herkunft_id === s.herkunft_id,
      ),
  )
  const artenToChoose = uniq(
    artHerkunftToChoose
      .filter((ah) =>
        row?.herkunft_id ? ah.herkunft_id === row?.herkunft_id : true,
      )
      .map((a) => a.art_id),
  )
  // do show own art
  if (row?.art_id && !artenToChoose.includes(row?.art_id)) {
    artenToChoose.push(row?.art_id)
  }
  const herkunftToChoose = uniq(
    artHerkunftToChoose
      .filter((ah) => (row?.art_id ? ah.art_id === row?.art_id : true))
      .map((a) => a.herkunft_id),
  )
  // do show own herkunft
  if (row?.herkunft_id && !herkunftToChoose.includes(row?.herkunft_id)) {
    herkunftToChoose.push(row?.herkunft_id)
  }

  const totalNr = kultursSorted.filter(hierarchyFilter).length
  const filteredNr = kultursFiltered.filter(hierarchyFilter).length

  const onClickToKulturen = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToZaehlungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Zaehlungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToAnLieferungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'An-Lieferungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToAusLieferungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Aus-Lieferungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToEvents = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Events']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToTks = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Teilkulturen']),
    [activeNodeArray, setActiveNodeArray],
  )

  const openKulturDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Kulturen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  return (
    <TitleContainer>
      <Title>Kultur</Title>
      <TitleSymbols>
        <IconButton title="Zur Kultur-Liste" onClick={onClickToKulturen}>
          <UpSvg />
        </IconButton>
        {row?.kultur_option?.tk && (
          <IconButton title="Zu den Teilkulturen" onClick={onClickToTks}>
            <TkDownSvg />
          </IconButton>
        )}
        <IconButton title="Zu den Zählungen" onClick={onClickToZaehlungen}>
          <ZaDownSvg />
        </IconButton>
        <IconButton
          title="Zu den An-Lieferungen"
          onClick={onClickToAnLieferungen}
        >
          <AnLiDownSvg />
        </IconButton>
        <IconButton
          title="Zu den Aus-Lieferungen"
          onClick={onClickToAusLieferungen}
        >
          <AusLiDownSvg />
        </IconButton>
        <IconButton title="Zu den Events" onClick={onClickToEvents}>
          <EvDownSvg />
        </IconButton>
        <AddButton />
        <DeleteButton row={row} />
        <Download row={row} />
        <IconButton
          aria-label="Anleitung öffnen"
          title="Anleitung öffnen"
          onClick={openKulturDocs}
        >
          <IoMdInformationCircleOutline />
        </IconButton>
        <Settings kulturId={row.id} />
        {(store.filter.show || isFiltered) && (
          <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
        )}
      </TitleSymbols>
    </TitleContainer>
  )
}

export default observer(Kultur)
