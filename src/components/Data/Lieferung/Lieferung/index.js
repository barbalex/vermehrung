import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from 'styled-components'
import last from 'lodash/last'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import isUuid from 'is-uuid'
import SplitPane from 'react-split-pane'

import { useQuery, StoreContext } from '../../../../models/reactUtils'
import Select from '../../../shared/Select'
import TextField from '../../../shared/TextField'
import Date from '../../../shared/Date'
import Checkbox2States from '../../../shared/Checkbox2States'
import FormTitle from '../../../shared/FormTitle'
import FilterTitle from '../../../shared/FilterTitle'
import exists from '../../../../utils/exists'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import {
  art as artFragment,
  lieferung as lieferungFragment,
  person as personFragment,
  sammelLieferung as sammelLieferungFragment,
} from '../../../../utils/fragments'
import Files from '../../Files'
import Settings from './Settings'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import appBaseUrl from '../../../../utils/appBaseUrl'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../../shared/ConflictList'
import sammlungLabelFromSammlung from './sammlungLabelFromSammlung'
import kulturLabelFromKultur from './kulturLabelFromKultur'

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
const TitleRow = styled.div`
  background-color: rgba(248, 243, 254, 1);
  flex-shrink: 0;
  display: flex;
  height: 40px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  position: sticky;
  top: -10px;
  z-index: 1;
  &:first-of-type {
    margin-top: -10px;
  }
`
const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  > div:not(:last-of-type) {
    padding-right: 8px;
  }
  > div > button {
    margin-top: 8px;
  }
`
const Herkunft = styled.div`
  height: 54px;
  user-select: none;
`
const HerkunftLabel = styled.div`
  color: rgb(0, 0, 0, 0.54);
  font-size: 12px;
  padding-bottom: 2px;
`
const StyledSplitPane = styled(SplitPane)`
  height: calc(100vh - 64px) !important;
  .Resizer {
    background: rgba(74, 20, 140, 0.1);
    opacity: 1;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 7px;
    cursor: col-resize;
  }
  .Resizer:hover {
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    background-color: #fff59d !important;
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .Pane {
    overflow: hidden;
  }
`
const CaseConflictTitle = styled.h4`
  margin-bottom: 10px;
`
const Rev = styled.span`
  font-weight: normal;
  padding-left: 7px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8em;
`

const allDataQuery = gql`
  query AllDataQueryForLieferungLieferung(
    $id: uuid!
    $lieferungFilter: lieferung_bool_exp!
    $hierarchyFilter: lieferung_bool_exp!
    $sammlungFilter: sammlung_bool_exp!
    $nachKulturFilter: kultur_bool_exp!
    $vonKulturFilter: kultur_bool_exp!
  ) {
    lieferung_total_count: lieferung_aggregate(where: $hierarchyFilter) {
      aggregate {
        count
      }
    }
    lieferung_filtered_count: lieferung_aggregate(where: $lieferungFilter) {
      aggregate {
        count
      }
    }
    lieferung(where: { id: { _eq: $id } }) {
      ...LieferungFields
      sammel_lieferung {
        ...SammelLieferungFields
        lieferungs {
          ...LieferungFields
        }
      }
      art {
        id
        __typename
        art_ae_art {
          id
          __typename
          name
        }
      }
      person {
        id
        __typename
        name
      }
      sammlung {
        id
        __typename
        datum
        herkunft {
          id
          __typename
          nr
          lokalname
          gemeinde
        }
        person {
          id
          __typename
          name
        }
      }
      kulturByVonKulturId {
        id
        __typename
        art_id
        herkunft_id
        herkunft {
          id
          __typename
          nr
          lokalname
          gemeinde
        }
        garten {
          id
          __typename
          person {
            id
            __typename
            name
            ort
          }
        }
      }
      kulturByNachKulturId {
        id
        __typename
        art_id
        herkunft_id
        herkunft {
          id
          __typename
          nr
          lokalname
          gemeinde
        }
        garten {
          id
          __typename
          person {
            id
            __typename
            name
            ort
          }
        }
      }
    }
    sammlung(
      where: $sammlungFilter
      order_by: [
        { datum: asc_nulls_first }
        { herkunft: { nr: asc_nulls_first } }
        { person: { name: asc_nulls_first } }
      ]
    ) {
      id
      __typename
      art_id
      datum
      herkunft_id
      herkunft {
        id
        __typename
        nr
        lokalname
        gemeinde
      }
      person {
        id
        __typename
        name
        ort
      }
    }
    nach_kultur: kultur(
      where: $nachKulturFilter
      order_by: [
        { garten: { person: { name: asc_nulls_first } } }
        { garten: { person: { ort: asc_nulls_first } } }
      ]
    ) {
      id
      __typename
      art_id
      herkunft_id
      garten {
        id
        __typename
        name
        person {
          id
          __typename
          name
          ort
        }
      }
    }
    von_kultur: kultur(
      where: $vonKulturFilter
      order_by: [
        { garten: { person: { name: asc_nulls_first } } }
        { garten: { person: { ort: asc_nulls_first } } }
      ]
    ) {
      id
      __typename
      art_id
      herkunft_id
      garten {
        id
        __typename
        name
        person {
          id
          __typename
          name
          ort
        }
      }
    }
    art {
      ...ArtFields
    }
    person {
      ...PersonFields
    }
  }
  ${artFragment}
  ${lieferungFragment}
  ${personFragment}
  ${sammelLieferungFragment}
`

const Lieferung = ({ showFilter, sammelLieferung = {} }) => {
  const existsSammelLieferung = !!sammelLieferung?.id
  const store = useContext(StoreContext)

  const {
    artsSorted,
    filter,
    kulturIdInActiveNodeArray,
    kultursSorted,
    online,
    personIdInActiveNodeArray,
    personsSorted,
    sammelLieferungIdInActiveNodeArray,
    sammlungIdInActiveNodeArray,
    sammlungsSorted,
    userPersonOption,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray } = store.tree

  const id = showFilter
    ? '99999999-9999-9999-9999-999999999999'
    : last(activeNodeArray.filter((e) => isUuid.v1(e)))
  const isFiltered = runIsFiltered()

  const hierarchyFilter = { _deleted: { _eq: false } }
  if (kulturIdInActiveNodeArray) {
    if (activeNodeArray.includes('Aus-Lieferungen')) {
      hierarchyFilter.von_kultur_id = {
        _eq: kulturIdInActiveNodeArray,
      }
    }
    if (activeNodeArray.includes('An-Lieferungen')) {
      hierarchyFilter.nach_kultur_id = {
        _eq: kulturIdInActiveNodeArray,
      }
    }
  }
  if (sammelLieferungIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
    hierarchyFilter.sammel_lieferung_id = {
      _eq: sammelLieferungIdInActiveNodeArray,
    }
  }
  if (personIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
    hierarchyFilter.person_id = {
      _eq: personIdInActiveNodeArray,
    }
  }
  if (sammlungIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
    hierarchyFilter.von_sammlung_id = {
      _eq: sammlungIdInActiveNodeArray,
    }
  }

  const row = showFilter ? filter.lieferung : store.lieferungs.get(id) ?? {}

  const lieferungFilter = { ...store.lieferungFilter, ...hierarchyFilter }

  const sammlungFilter = row?.art_id
    ? { art_id: { _eq: row.art_id } }
    : { id: { _is_null: false } }

  // only kulturen of same herkunft!
  // beware: art_id, herkunft_id and von_kultur_id can be null
  let nachKulturFilter = { id: { _is_null: false } }
  // show only kulturen of art_id
  if (row?.art_id) {
    nachKulturFilter = {
      art_id: { _eq: row.art_id },
    }
  }
  // show only kulturen with same herkunft
  if (row?.art_id && herkunft && herkunft.id) {
    nachKulturFilter = {
      art_id: { _eq: row.art_id },
      herkunft_id: { _eq: herkunft.id },
    }
  }
  // shall be delivered to same kultur it came from
  if (
    row?.art_id &&
    herkunft &&
    herkunft.id &&
    // ensure set value is always shown
    row?.von_kultur_id &&
    row?.von_kultur_id !== row.nach_kultur_id
  ) {
    nachKulturFilter = {
      art_id: { _eq: row.art_id },
      herkunft_id: { _eq: herkunft.id },
      id: { _neq: row.von_kultur_id },
    }
  }

  // beware: art_id, herkunft_id and nach_kultur_id can be null
  let vonKulturFilter = { id: { _is_null: false } }
  // show only kulturen of art_id
  if (row?.art_id) {
    vonKulturFilter = {
      art_id: { _eq: row.art_id },
    }
  }
  // show only kulturen with same herkunft
  if (row?.art_id && herkunft && herkunft.id) {
    vonKulturFilter = {
      art_id: { _eq: row.art_id },
      herkunft_id: { _eq: herkunft.id },
    }
  }
  // shall not be delivered to same kultur it came from
  if (
    row?.art_id &&
    herkunft &&
    herkunft.id &&
    row?.nach_kultur_id &&
    // ensure set value is always shown
    row?.von_kultur_id &&
    row?.von_kultur_id !== row.nach_kultur_id
  ) {
    vonKulturFilter = {
      art_id: { _eq: row.art_id },
      herkunft_id: { _eq: herkunft.id },
      id: { _neq: row.nach_kultur_id },
    }
  }

  const { data, error, loading, query: queryOfLieferung } = useQuery(
    allDataQuery,
    {
      variables: {
        id,
        lieferungFilter,
        hierarchyFilter,
        sammlungFilter,
        nachKulturFilter,
        vonKulturFilter,
      },
    },
  )

  const [errors, setErrors] = useState({})

  const totalNr = data?.lieferung_total_count?.aggregate?.count
  const filteredNr = data?.lieferung_filtered_count?.aggregate?.count

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => {
    setActiveConflict(null)
    queryOfLieferung.refetch()
  }, [queryOfLieferung])
  const callbackAfterUebernehmen = useCallback(() => {
    setActiveConflict(null)
    queryOfLieferung.refetch()
  }, [queryOfLieferung])

  const { li_show_sl_felder } = userPersonOption

  const urlLastName = activeNodeArray[activeNodeArray.length - 2]
  const isAnlieferung = urlLastName === 'An-Lieferungen'
  const isAuslieferung = urlLastName === 'Aus-Lieferungen'

  const ifNeeded = useCallback(
    (field) => {
      if (existsSammelLieferung && li_show_sl_felder) return true
      if (!exists(sammelLieferung[field]) || sammelLieferung[field] === false) {
        return true
      } else if (sammelLieferung[field] !== row[field]) {
        return true
      }
      return false
    },
    [existsSammelLieferung, li_show_sl_felder, row, sammelLieferung],
  )
  const ifSomeNeeded = useCallback(
    (fields) => fields.some((f) => ifNeeded(f)),
    [ifNeeded],
  )
  const ifAllNeeded = useCallback(
    (fields) => fields.every((f) => ifNeeded(f)),
    [ifNeeded],
  )

  const herkunftByKultur = isAnlieferung
    ? row?.kulturByNachKulturId?.herkunft
    : row?.kulturByVonKulturId?.herkunft
  const herkunftBySammlung = row?.sammlung?.herkunft
  const herkunft = herkunftByKultur || herkunftBySammlung
  const herkunftQuelle = herkunftByKultur ? 'Kultur' : 'Sammlung'
  const herkunftValue = herkunft
    ? `${herkunft.nr || '(keine Nr)'}: ${
        herkunft.gemeinde || '(keine Gemeinde)'
      }, ${herkunft.lokalname || '(kein Lokalname)'}`
    : ''
  const showVon =
    (!!row?.art_id && !isAuslieferung) ||
    (existsSammelLieferung && ifAllNeeded(['von_sammlung_id', 'von_kultur_id']))
  const showNach =
    (herkunft && !isAnlieferung) ||
    (existsSammelLieferung &&
      ifAllNeeded(['nach_kultur_id', 'nach_ausgepflanzt']))

  useEffect(() => {
    setErrors({})
  }, [id])

  const vonKulturWerteData = kultursSorted
    // show only kulturen of art_id
    .filter((k) => {
      if (row?.art_id) return k.art_id === row.art_id
      return true
    })
    // show only kulturen with same herkunft
    .filter((k) => {
      if (herkunft?.id) return k?.herkunft_id === herkunft.id
      return true
    })
    // shall not be delivered to same kultur it came from
    .filter((k) => {
      if (row?.nach_kultur_id && row?.von_kultur_id !== row?.nach_kultur_id) {
        return k.id !== row.nach_kultur_id
      }
      return true
    })
  const vonKulturWerte = useMemo(
    () =>
      vonKulturWerteData.map((el) => {
        const personName = el?.garten?.person?.name ?? '(kein Name)'
        const personOrt = el?.garten?.person?.ort ?? null
        const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`
        const label = el?.garten?.name ?? personLabel

        return {
          value: el.id,
          label,
        }
      }),
    [vonKulturWerteData],
  )
  const nachKulturWerteData = kultursSorted
    // show only kulturen of art_id
    .filter((k) => {
      if (row?.art_id) return k.art_id === row.art_id
      return true
    })
    // show only kulturen with same herkunft
    .filter((k) => {
      if (herkunft?.id) return k.herkunft_id === herkunft.id
      return true
    })
    // shall not be delivered to same kultur it came from
    .filter((k) => {
      if (row?.von_kultur_id && row?.von_kultur_id !== row?.nach_kultur_id) {
        return k.id !== row.von_kultur_id
      }
      return true
    })
  const nachKulturWerte = useMemo(
    () =>
      nachKulturWerteData.map((el) => ({
        value: el.id,
        label: kulturLabelFromKultur(el),
      })),
    [nachKulturWerteData],
  )

  const sammlungWerte = useMemo(
    () =>
      sammlungsSorted
        .filter((s) => s.art_id === row.art_id)
        .map((el) => ({
          value: el.id,
          label: sammlungLabelFromSammlung(el),
        })),
    [row.art_id, sammlungsSorted],
  )

  const personWerte = useMemo(
    () =>
      personsSorted.map((el) => ({
        value: el.id,
        label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personsSorted],
  )

  const artWerte = useMemo(
    () =>
      artsSorted.map((el) => ({
        value: el.id,
        label: el?.art_ae_art?.name ?? '(kein Artname)',
      })),
    [artsSorted],
  )

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
        return filter.setValue({ table: 'lieferung', key: field, value })
      }
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )
  const openPlanenDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Planen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  const openLieferungDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Lieferungen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  const openGenVielfaldDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Genetische-Vielfalt`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  console.log('lieferung rendering')

  if (loading) {
    return (
      <Container>
        <FormTitle title="Lieferung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Lieferung" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  const firstPaneWidth = activeConflict ? '50%' : '100%'
  // hide resizer when tree is hidden
  const resizerStyle = !activeConflict ? { width: 0 } : {}

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Lieferung"
            table="lieferung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Lieferung</Title>
            <TitleSymbols>
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
              {(store.filter.show || isFiltered) && (
                <TitleFilterNumbers>{`${filteredNr}/${totalNr}`}</TitleFilterNumbers>
              )}
            </TitleSymbols>
          </TitleContainer>
        )}
        <Container>
          <StyledSplitPane
            split="vertical"
            size={firstPaneWidth}
            minSize={200}
            resizerStyle={resizerStyle}
          >
            <FieldsContainer>
              {activeConflict && (
                <CaseConflictTitle>
                  Aktuelle Version<Rev>{row._rev}</Rev>
                </CaseConflictTitle>
              )}
              {ifSomeNeeded([
                'art_id',
                'anzahl_pflanzen',
                'anzahl_auspflanzbereit',
                'gramm_samen',
                'andere_menge',
                'von_anzahl_individuen',
              ]) && (
                <>
                  <TitleRow>
                    <Title>was</Title>
                  </TitleRow>
                  {ifNeeded('art_id') && (
                    <Select
                      key={`${row.id}art_id`}
                      name="art_id"
                      value={row.art_id}
                      field="art_id"
                      label="Art"
                      options={artWerte}
                      loading={loading}
                      saveToDb={saveToDb}
                      error={errors.art_id}
                    />
                  )}
                  {herkunftValue && (
                    <Herkunft>
                      <HerkunftLabel>{`Herkunft (berechnet aus ${herkunftQuelle})`}</HerkunftLabel>
                      {herkunftValue}
                    </Herkunft>
                  )}
                  <FieldRow>
                    {ifNeeded('anzahl_pflanzen') && (
                      <TextField
                        key={`${row.id}anzahl_pflanzen`}
                        name="anzahl_pflanzen"
                        label="Anzahl Pflanzen"
                        value={row.anzahl_pflanzen}
                        saveToDb={saveToDb}
                        error={errors.anzahl_pflanzen}
                        type="number"
                      />
                    )}
                    {ifNeeded('anzahl_auspflanzbereit') && (
                      <TextField
                        key={`${row.id}anzahl_auspflanzbereit`}
                        name="anzahl_auspflanzbereit"
                        label="Anzahl auspflanzbereit"
                        value={row.anzahl_auspflanzbereit}
                        saveToDb={saveToDb}
                        error={errors.anzahl_auspflanzbereit}
                        type="number"
                      />
                    )}
                  </FieldRow>
                  <FieldRow>
                    {ifNeeded('gramm_samen') && (
                      <TextField
                        key={`${row.id}gramm_samen`}
                        name="gramm_samen"
                        label="Gramm Samen"
                        value={row.gramm_samen}
                        saveToDb={saveToDb}
                        error={errors.gramm_samen}
                        type="number"
                      />
                    )}
                    {ifNeeded('andere_menge') && (
                      <TextField
                        key={`${row.id}andere_menge`}
                        name="andere_menge"
                        label={`Andere Menge (z.B. "3 Zwiebeln")`}
                        value={row.andere_menge}
                        saveToDb={saveToDb}
                        error={errors.andere_menge}
                        type="text"
                      />
                    )}
                  </FieldRow>
                  {ifNeeded('von_anzahl_individuen') && (
                    <FieldRow>
                      <TextField
                        key={`${row.id}von_anzahl_individuen`}
                        name="von_anzahl_individuen"
                        label="von Anzahl Individuen"
                        value={row.von_anzahl_individuen}
                        saveToDb={saveToDb}
                        error={errors.von_anzahl_individuen}
                        type="number"
                      />
                      <div>
                        <IconButton
                          aria-label="Anleitung öffnen"
                          title="Anleitung öffnen"
                          onClick={openGenVielfaldDocs}
                        >
                          <IoMdInformationCircleOutline />
                        </IconButton>
                      </div>
                    </FieldRow>
                  )}
                </>
              )}
              {showVon && (
                <>
                  <TitleRow>
                    <Title>von</Title>
                  </TitleRow>
                  {ifNeeded('von_sammlung_id') && (
                    <Select
                      key={`${row.id}${row.von_sammlung_id}von_sammlung_id`}
                      name="von_sammlung_id"
                      value={row.von_sammlung_id}
                      field="von_sammlung_id"
                      label={`Sammlung${
                        exists(row.art_id) ? ' (nur solche derselben Art)' : ''
                      }`}
                      options={sammlungWerte}
                      loading={loading}
                      saveToDb={saveToDb}
                      error={errors.von_sammlung_id}
                    />
                  )}
                  {ifNeeded('von_kultur_id') && (
                    <Select
                      key={`${row.id}${row.von_kultur_id}von_kultur_id`}
                      name="von_kultur_id"
                      value={row.von_kultur_id}
                      field="von_kultur_id"
                      label={`Kultur${
                        exists(row.art_id) ? ' (nur solche derselben Art)' : ''
                      }`}
                      options={vonKulturWerte}
                      loading={loading}
                      saveToDb={saveToDb}
                      error={errors.von_kultur_id}
                    />
                  )}
                </>
              )}
              {showNach && (
                <>
                  <TitleRow>
                    <Title>nach</Title>
                  </TitleRow>
                  {ifNeeded('nach_kultur_id') && (
                    <Select
                      key={`${row.id}${row.nach_kultur_id}nach_kultur_id`}
                      name="nach_kultur_id"
                      value={row.nach_kultur_id}
                      field="nach_kultur_id"
                      label={`Kultur${
                        exists(row.art_id)
                          ? ` (Kulturen derselben Art und Herkunft${
                              row.von_kultur_id ? ', ohne die von-Kultur' : ''
                            })`
                          : ''
                      }`}
                      options={nachKulturWerte}
                      loading={loading}
                      saveToDb={saveToDb}
                      error={errors.nach_kultur_id}
                    />
                  )}
                  {ifNeeded('nach_ausgepflanzt') && (
                    <Checkbox2States
                      key={`${row.id}nach_ausgepflanzt`}
                      label="ausgepflanzt"
                      name="nach_ausgepflanzt"
                      value={row.nach_ausgepflanzt}
                      saveToDb={saveToDb}
                      error={errors.nach_ausgepflanzt}
                    />
                  )}
                </>
              )}
              {ifSomeNeeded(['datum', 'geplant']) && (
                <>
                  <TitleRow>
                    <Title>wann</Title>
                  </TitleRow>
                  {ifNeeded('datum') && (
                    <Date
                      key={`${row.id}datum`}
                      name="datum"
                      label="Datum"
                      value={row.datum}
                      saveToDb={saveToDb}
                      error={errors.datum}
                    />
                  )}
                  {ifNeeded('geplant') && (
                    <FieldRow>
                      <Checkbox2States
                        key={`${row.id}geplant`}
                        label="Geplant"
                        name="geplant"
                        value={row.geplant}
                        saveToDb={saveToDb}
                        error={errors.geplant}
                      />
                      <div>
                        <IconButton
                          aria-label="Anleitung öffnen"
                          title="Anleitung öffnen"
                          onClick={openPlanenDocs}
                        >
                          <IoMdInformationCircleOutline />
                        </IconButton>
                      </div>
                    </FieldRow>
                  )}
                </>
              )}
              {ifSomeNeeded(['person_id', 'bemerkungen']) && (
                <>
                  <TitleRow>
                    <Title>wer</Title>
                  </TitleRow>
                  {ifNeeded('person_id') && (
                    <Select
                      key={`${row.id}person_id`}
                      name="person_id"
                      value={row.person_id}
                      field="person_id"
                      label="Person"
                      options={personWerte}
                      loading={loading}
                      saveToDb={saveToDb}
                      error={errors.person_id}
                    />
                  )}
                  {ifNeeded('bemerkungen') && (
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
                    row._conflicts.map && (
                      <ConflictList
                        conflicts={row._conflicts}
                        activeConflict={activeConflict}
                        setActiveConflict={setActiveConflict}
                      />
                    )}
                  {!showFilter && (
                    <Files parentId={row.id} parent="lieferung" />
                  )}
                </>
              )}
            </FieldsContainer>
            <>
              {online && !!activeConflict && (
                <Conflict
                  rev={activeConflict}
                  id={id}
                  row={row}
                  callbackAfterVerwerfen={callbackAfterVerwerfen}
                  callbackAfterUebernehmen={callbackAfterUebernehmen}
                  setActiveConflict={setActiveConflict}
                />
              )}
            </>
          </StyledSplitPane>
        </Container>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Lieferung)
