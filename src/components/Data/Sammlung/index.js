import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import styled from 'styled-components'
import get from 'lodash/get'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import SplitPane from 'react-split-pane'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import toPgArray from '../../../utils/toPgArray'
import toStringIfPossible from '../../../utils/toStringIfPossible'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Date from '../../shared/Date'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import Checkbox2States from '../../shared/Checkbox2States'
import Coordinates from '../../shared/Coordinates'
import {
  sammlung as sammlungFragment,
  art as artFragment,
} from '../../../utils/fragments'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import appBaseUrl from '../../../utils/appBaseUrl'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import herkunftLabelFromHerkunft from './herkunftLabelFromHerkunft'

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

const query = gql`
  query SammlungQueryForSammlung(
    $id: uuid!
    $isFiltered: Boolean!
    $filter: sammlung_bool_exp!
  ) {
    sammlung(where: { id: { _eq: $id } }) {
      ...SammlungFields
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
      herkunft {
        id
        __typename
        gemeinde
        lokalname
        nr
      }
    }
    rowsFiltered: sammlung(where: $filter) @include(if: $isFiltered) {
      id
      __typename
    }
  }
  ${sammlungFragment}
`
const dataQuery = gql`
  query dataQuery {
    person(order_by: [{ name: asc_nulls_first }, { ort: asc_nulls_first }]) {
      id
      __typename
      name
      ort
    }
    herkunft(
      order_by: [
        { nr: asc_nulls_first }
        { gemeinde: asc_nulls_first }
        { lokalname: asc_nulls_first }
      ]
    ) {
      id
      __typename
      nr
      lokalname
      gemeinde
    }
    art(order_by: { art_ae_art: { name: asc } }) {
      ...ArtFields
    }
  }
  ${artFragment}
`

const Sammlung = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { filter, upsertSammlung, addQueuedQuery, user, online } = store
  const { isFiltered: runIsFiltered } = filter
  const { refetch: refetchTree } = store.tree

  const isFiltered = runIsFiltered()
  const sammlungFilter = queryFromTable({ store, table: 'sammlung' })
  const { data, error, loading, query: queryOfSammlung } = useQuery(query, {
    variables: { id, isFiltered, filter: sammlungFilter },
  })
  const { data: dataData, error: dataError, loading: dataLoading } = useQuery(
    dataQuery,
  )

  const [errors, setErrors] = useState({})

  const { data: dataSammlungAggregate } = useQuery((store) =>
    store.querySammlung_aggregate(undefined, (d) =>
      d.aggregate((d) => d.count),
    ),
  )
  const totalNr = get(
    dataSammlungAggregate,
    'sammlung_aggregate.aggregate.count',
    0,
  )
  const filteredNr = get(data, 'rowsFiltered', []).length
  const row = showFilter ? filter.sammlung : store.sammlungs.get(id)

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => {
    setActiveConflict(null)
    queryOfSammlung.refetch()
  }, [queryOfSammlung])
  const callbackAfterUebernehmen = useCallback(() => {
    queryOfSammlung.refetch()
    setActiveConflict(row?._rev ?? null)
  }, [queryOfSammlung, row?._rev])

  useEffect(() => {
    setErrors({})
  }, [id])

  const personWerte = useMemo(
    () =>
      get(dataData, 'person', []).map((el) => ({
        value: el.id,
        label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [dataData],
  )

  const herkunftWerte = useMemo(
    () =>
      get(dataData, 'herkunft', []).map((el) => ({
        value: el.id,
        label: herkunftLabelFromHerkunft(el),
      })),
    [dataData],
  )

  const artWerte = useMemo(
    () =>
      get(dataData, 'art', []).map((el) => ({
        value: el.id,
        label: get(el, 'art_ae_art.name') || '(kein Artname)',
      })),
    [dataData],
  )

  const saveToDb = useCallback(
    (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return

      if (showFilter) {
        return filter.setValue({ table: 'sammlung', key: field, value })
      }
      // first build the part that will be revisioned
      const depth = row._depth + 1
      const newObject = {
        sammlung_id: id,
        art_id: field === 'art_id' ? value : row.art_id,
        person_id: field === 'person_id' ? value : row.person_id,
        herkunft_id: field === 'herkunft_id' ? value : row.herkunft_id,
        nr: field === 'nr' ? toStringIfPossible(value) : row.nr,
        geom_point: field === 'geom_point' ? value : row.geom_point,
        datum: field === 'datum' ? value : row.datum,
        von_anzahl_individuen:
          field === 'von_anzahl_individuen' ? value : row.von_anzahl_individuen,
        anzahl_pflanzen:
          field === 'anzahl_pflanzen' ? value : row.anzahl_pflanzen,
        gramm_samen: field === 'gramm_samen' ? value : row.gramm_samen,
        andere_menge:
          field === 'andere_menge'
            ? toStringIfPossible(value)
            : row.andere_menge,
        geplant: field === 'geplant' ? value : row.geplant,
        bemerkungen:
          field === 'bemerkungen' ? toStringIfPossible(value) : row.bemerkungen,
        changed_by: user.email,
        _parent_rev: row._rev,
        _depth: depth,
      }
      const rev = `${depth}-${md5(JSON.stringify(newObject))}`
      // DO NOT include id in rev - or revs with same data will conflict
      newObject.id = uuidv1()
      newObject._rev = rev
      newObject.changed = new window.Date().toISOString()
      const newObjectForStore = { ...newObject }
      // convert array to string as hasura does not support arrays yet
      // https://github.com/hasura/graphql-engine/pull/2243
      newObject._revisions = row._revisions
        ? toPgArray([rev, ...row._revisions])
        : toPgArray([rev])
      // do not stringify revisions for store
      // as _that_ is a real array
      newObjectForStore._revisions = row._revisions
        ? [rev, ...row._revisions]
        : [rev]
      addQueuedQuery({
        name: 'mutateInsert_sammlung_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'sammlung_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'querySammlung',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: id } },
        }),
      })
      setTimeout(() => {
        // optimistically update store
        upsertSammlung(newObjectForStore)
        // refetch query because is not a model instance
        queryOfSammlung.refetch()
        // TODO: update tree if one of these fields were changed
        if (['herkunft_id', 'person_id', 'art_id', 'nr'].includes(field)) {
          refetchTree()
        }
      }, 100)
    },
    [
      addQueuedQuery,
      filter,
      id,
      refetchTree,
      row,
      showFilter,
      queryOfSammlung,
      upsertSammlung,
      user.email,
    ],
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
  const openGenVielfaldDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Genetische-Vielfalt`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  const openSammlungDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Sammlungen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  if (loading) {
    return (
      <Container>
        <FormTitle title="Sammlung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error || dataError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Sammlung" />
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
            title="Sammlung"
            table="sammlung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Sammlung</Title>
            <TitleSymbols>
              <AddButton />
              <DeleteButton row={row} />
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openSammlungDocs}
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
              <TextField
                key={`${row.id}nr`}
                name="nr"
                label="Nr."
                value={row.nr}
                saveToDb={saveToDb}
                error={errors.nr}
                type="text"
              />
              <Select
                key={`${row.id}${row.art_id}art_id`}
                name="art_id"
                value={row.art_id}
                field="art_id"
                label="Art"
                options={artWerte}
                loading={dataLoading}
                saveToDb={saveToDb}
                error={errors.art_id}
              />
              <Select
                key={`${row.id}${row.herkunft_id}herkunft_id`}
                name="herkunft_id"
                value={row.herkunft_id}
                field="herkunft_id"
                label="Herkunft"
                options={herkunftWerte}
                loading={dataLoading}
                saveToDb={saveToDb}
                error={errors.herkunft_id}
              />
              <Select
                key={`${row.id}${row.person_id}person_id`}
                name="person_id"
                value={row.person_id}
                field="person_id"
                label="Person"
                options={personWerte}
                loading={dataLoading}
                saveToDb={saveToDb}
                error={errors.person_id}
              />
              <Date
                key={`${row.id}datum`}
                name="datum"
                label="Datum"
                value={row.datum}
                saveToDb={saveToDb}
                error={errors.datum}
              />
              <TextField
                key={`${row.id}anzahl_pflanzen`}
                name="anzahl_pflanzen"
                label="Anzahl Pflanzen"
                value={row.anzahl_pflanzen}
                saveToDb={saveToDb}
                error={errors.anzahl_pflanzen}
                type="number"
              />
              <FieldRow>
                <TextField
                  key={`${row.id}gramm_samen`}
                  name="gramm_samen"
                  label="Gramm Samen"
                  value={row.gramm_samen}
                  saveToDb={saveToDb}
                  error={errors.gramm_samen}
                  type="number"
                />
                <TextField
                  key={`${row.id}andere_menge`}
                  name="andere_menge"
                  label={`Andere Menge (z.B. "3 Zwiebeln")`}
                  value={row.andere_menge}
                  saveToDb={saveToDb}
                  error={errors.andere_menge}
                  type="text"
                />
              </FieldRow>
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
              {!showFilter && <Coordinates row={row} saveToDb={saveToDb} />}
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
              <TextField
                key={`${row.id}bemerkungen`}
                name="bemerkungen"
                label="Bemerkungen"
                value={row.bemerkungen}
                saveToDb={saveToDb}
                error={errors.bemerkungen}
                multiLine
              />
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
              {!showFilter && <Files parentId={row.id} parent="sammlung" />}
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

export default observer(Sammlung)
