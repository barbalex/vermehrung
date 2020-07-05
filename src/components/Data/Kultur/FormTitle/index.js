import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import uniq from 'lodash/uniq'

import { StoreContext } from '../../../../models/reactUtils'
import Settings from './Settings'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import FilterNumbers from '../../../shared/FilterNumbers'
import Download from './Download'
import Anleitung from './Anleitung'
import NavButtons from './NavButtons'

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
    gartenIdInActiveNodeArray,
    artIdInActiveNodeArray,
    kultursSorted,
    kultursFiltered,
    sammlungsSorted,
  } = store

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

  return (
    <TitleContainer>
      <Title>Kultur</Title>
      <TitleSymbols>
        <NavButtons row={row} />
        <AddButton />
        <DeleteButton row={row} />
        <Download row={row} />
        <Anleitung />
        <Settings kulturId={row.id} />
        <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default observer(Kultur)
