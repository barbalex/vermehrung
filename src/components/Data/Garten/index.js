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
import get from 'lodash/get'
import md5 from 'blueimp-md5'
import SplitPane from 'react-split-pane'
import { v1 as uuidv1 } from 'uuid'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import toPgArray from '../../../utils/toPgArray'
import toStringIfPossible from '../../../utils/toStringIfPossible'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Checkbox2States from '../../shared/Checkbox2States'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import {
  garten as gartenFragment,
  personOption as personOptionFragment,
} from '../../../utils/fragments'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import queryFromTable from '../../../utils/queryFromTable'
import Files from '../Files'
import Coordinates from '../../shared/Coordinates'
import Settings from './Settings'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Download from './Download'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`
const TitleContainer = styled.div`
  background-color:rgba(74, 20, 140, 0.1);
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

const gartenQuery = gql`
  query GartenQueryForGarten(
    $id: uuid!
    $isFiltered: Boolean!
    $filter: garten_bool_exp!
  ) {
    garten(where: { id: { _eq: $id } }) {
      ...GartenFields
    }
    rowsFiltered: garten(where: $filter) @include(if: $isFiltered) {
      id
      __typename
    }
  }
  ${gartenFragment}
`
const personQuery = gql`
  query personQueryForGarten {
    person(order_by: [{ name: asc_nulls_first }, { ort: asc_nulls_first }]) {
      id
      __typename
      name
      ort
    }
  }
`
const personOptionQuery = gql`
  query PersonOptionQueryForGarten($accountId: String) {
    person_option(where: { person: { account_id: { _eq: $accountId } } }) {
      ...PersonOptionFields
    }
  }
  ${personOptionFragment}
`

const Garten = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)

  const { filter, upsertGarten, addQueuedQuery, user, online } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()
  const gartenFilter = queryFromTable({ store, table: 'garten' })
  const { data, error, loading, query: queryOfGarten } = useQuery(gartenQuery, {
    variables: { id, isFiltered, filter: gartenFilter },
  })
  const {
    data: personData,
    error: personError,
    loading: personLoading,
  } = useQuery(personQuery)

  const [errors, setErrors] = useState({})

  const { data: dataGartenAggregate } = useQuery((store) =>
    store.queryGarten_aggregate(undefined, (d) => d.aggregate((d) => d.count)),
  )
  const totalNr = get(
    dataGartenAggregate,
    'garten_aggregate.aggregate.count',
    0,
  )
  const filteredNr = get(data, 'rowsFiltered', []).length
  const row = showFilter ? filter.garten : store.gartens.get(id)

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => {
    setActiveConflict(null)
    queryOfGarten.refetch()
  }, [queryOfGarten])
  const callbackAfterUebernehmen = useCallback(() => {
    queryOfGarten.refetch()
    setActiveConflict(row._rev)
  }, [queryOfGarten, row._rev])

  const personOptionResult = useQuery(personOptionQuery, {
    variables: { accountId: user.uid },
  })
  const {
    ga_strasse,
    ga_plz,
    ga_ort,
    ga_geom_point,
    ga_aktiv,
    ga_bemerkungen,
    person_id,
  } = get(personOptionResult.data, 'person_option[0]', {}) || {}

  useEffect(() => {
    setErrors({})
  }, [id])

  const personWerte = useMemo(
    () =>
      get(personData, 'person', []).map((el) => ({
        value: el.id,
        label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personData],
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
        return filter.setValue({ table: 'garten', key: field, value })
      }
      // first build the part that will be revisioned
      const depth = row._depth + 1
      const newObject = {
        garten_id: row.id,
        name: field === 'name' ? toStringIfPossible(value) : row.name,
        person_id: field === 'person_id' ? value : row.person_id,
        strasse: field === 'strasse' ? toStringIfPossible(value) : row.strasse,
        plz: field === 'plz' ? value : row.plz,
        ort: field === 'ort' ? toStringIfPossible(value) : row.ort,
        geom_point: field === 'geom_point' ? value : row.geom_point,
        aktiv: field === 'aktiv' ? value : row.aktiv,
        bemerkungen:
          field === 'bemerkungen' ? toStringIfPossible(value) : row.bemerkungen,
        changed: new window.Date().toISOString(),
        changed_by: user.email,
        _parent_rev: row._rev,
        _depth: depth,
      }
      const rev = `${depth}-${md5(JSON.stringify(newObject))}`
      // DO NOT include id in rev - or revs with same data will conflict
      newObject.id = uuidv1()
      newObject._rev = rev
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
        name: 'mutateInsert_garten_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'garten_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryGarten',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: id } },
        }),
      })
      setTimeout(() => {
        // optimistically update store
        upsertGarten(newObjectForStore)
        if (['name'].includes(field)) store.tree.refetch()
      }, 100)
    },
    [
      addQueuedQuery,
      filter,
      id,
      row,
      showFilter,
      store.tree,
      upsertGarten,
      user.email,
    ],
  )

  if (loading) {
    return (
      <Container>
        <FormTitle title="Garten" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Garten" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }
  if (personError) {
    return (
      <Container>
        <FormTitle title="Garten" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${personError.message}`}</FieldsContainer>
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
            title="Garten"
            table="garten"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Garten</Title>
            <TitleSymbols>
              <AddButton />
              <DeleteButton row={row} />
              <Download gartenId={row.id} />
              <Settings
                personId={person_id}
                personOptionResult={personOptionResult}
              />
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
                key={`${row.id}name`}
                name="name"
                label="Name"
                value={row.name}
                saveToDb={saveToDb}
                error={errors.name}
              />
              <Select
                key={`${row.id}${row.person_id}person_id`}
                name="person_id"
                value={row.person_id}
                field="person_id"
                label="Person"
                options={personWerte}
                loading={personLoading}
                saveToDb={saveToDb}
                error={errors.person_id}
              />
              {ga_strasse && (
                <TextField
                  key={`${row.id}strasse`}
                  name="strasse"
                  label="Strasse"
                  value={row.strasse}
                  saveToDb={saveToDb}
                  error={errors.strasse}
                />
              )}
              {ga_plz && (
                <TextField
                  key={`${row.id}plz`}
                  name="plz"
                  label="PLZ"
                  value={row.plz}
                  saveToDb={saveToDb}
                  error={errors.plz}
                  type="number"
                />
              )}
              {ga_ort && (
                <TextField
                  key={`${row.id}ort`}
                  name="ort"
                  label="Ort"
                  value={row.ort}
                  saveToDb={saveToDb}
                  error={errors.ort}
                />
              )}
              {!showFilter && ga_geom_point && (
                <Coordinates row={row} saveToDb={saveToDb} />
              )}
              {ga_aktiv && (
                <Checkbox2States
                  key={`${row.id}aktiv`}
                  label="aktiv"
                  name="aktiv"
                  value={row.aktiv}
                  saveToDb={saveToDb}
                  error={errors.aktiv}
                />
              )}
              {ga_bemerkungen && (
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
              {!showFilter && <Files parentId={row.id} parent="garten" />}
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

export default observer(Garten)
