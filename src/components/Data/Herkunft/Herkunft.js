import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'

import { StoreContext } from '../../../models/reactUtils'
import TextField from '../../shared/TextField'
import FilterTitle from '../../shared/FilterTitle'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Coordinates from '../../shared/Coordinates'
import Settings from './Settings'
import ErrorBoundary from '../../shared/ErrorBoundary'
import getConstants from '../../../utils/constants'

const constants = getConstants()

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`
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
const TitleFilterNumbers = styled.div`
  cursor: default;
  user-select: none;
  padding: 0 5px;
  margin-top: auto;
  margin-bottom: auto;
  min-width: 48px;
  text-align: center;
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`

const Herkunft = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const {
    filter,
    online,
    herkunftsSorted,
    herkunftsFiltered,
    userPersonOption,
    sammlungIdInActiveNodeArray,
  } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()

  const hierarchyFilter = (e) => {
    if (sammlungIdInActiveNodeArray) {
      return (e?.sammlungs ?? [])
        .map((s) => s.id)
        .includes(sammlungIdInActiveNodeArray)
    }
    return true
  }

  const row = showFilter ? filter.herkunft : store.herkunfts.get(id) || {}

  const totalNr = herkunftsSorted.filter(hierarchyFilter).length
  const filteredNr = herkunftsFiltered.filter(hierarchyFilter).length

  const { hk_kanton, hk_land, hk_bemerkungen, hk_geom_point } = userPersonOption

  const [errors, setErrors] = useState({})
  useEffect(() => {
    setErrors({})
  }, [id])

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return

      if (showFilter) {
        return filter.setValue({ table: 'herkunft', key: field, value })
      }
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )
  const openHerkunftDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Herkuenfte`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  if (!row || (!showFilter && filter.show)) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Herkunft"
            table="herkunft"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Herkunft</Title>
            <TitleSymbols>
              <AddButton />
              <DeleteButton row={row} />
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openHerkunftDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
              <Settings />
              {(store.filter.show || isFiltered) && (
                <TitleFilterNumbers>{`${filteredNr}/${totalNr}`}</TitleFilterNumbers>
              )}
            </TitleSymbols>
          </TitleContainer>
        )}
        <FieldsContainer>
          <TextField
            key={`${row.id}nr`}
            name="nr"
            label="Nr"
            value={row.nr}
            saveToDb={saveToDb}
            error={errors.nr}
          />
          <TextField
            key={`${row.id}lokalname`}
            name="lokalname"
            label="Lokalname"
            value={row.lokalname}
            saveToDb={saveToDb}
            error={errors.lokalname}
          />
          <TextField
            key={`${row.id}gemeinde`}
            name="gemeinde"
            label="Gemeinde"
            value={row.gemeinde}
            saveToDb={saveToDb}
            error={errors.gemeinde}
          />
          {hk_kanton && (
            <TextField
              key={`${row.id}kanton`}
              name="kanton"
              label="Kanton"
              value={row.kanton}
              saveToDb={saveToDb}
              error={errors.kanton}
            />
          )}
          {hk_land && (
            <TextField
              key={`${row.id}land`}
              name="land"
              label="Land"
              value={row.land}
              saveToDb={saveToDb}
              error={errors.land}
            />
          )}
          {!showFilter && hk_geom_point && (
            <Coordinates row={row} saveToDb={saveToDb} />
          )}
          {hk_bemerkungen && (
            <TextField
              key={`${row.id}bemerkungen`}
              name="bemerkungen"
              label="Bemerkungen"
              value={row.bemerkungen}
              saveToDb={saveToDb}
              error={errors.bemerkungen}
              multiLine
            />
          )}
          {online &&
            !showFilter &&
            row._conflicts &&
            row._conflicts.map &&
            [...row._conflicts]
              .sort()
              .map((c) => <div key={c}>{`Konflikt mit: ${c}`}</div>)}
          {!showFilter && row.id && (
            <Files parentId={row.id} parent="herkunft" />
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Herkunft)
