import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import get from 'lodash/get'
import md5 from 'blueimp-md5'
import SplitPane from 'react-split-pane'
import { v1 as uuidv1 } from 'uuid'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import toPgArray from '../../../utils/toPgArray'
import toStringIfPossible from '../../../utils/toStringIfPossible'
import TextField from '../../shared/TextField'
import Select from '../../shared/Select'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import Checkbox2States from '../../shared/Checkbox2States'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import Arten from './Arten'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
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

const Person = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)

  const { filter, upsertPersonModel, addQueuedQuery, user, online } = store
  const { isFiltered: runIsFiltered } = filter
  const { refetch: refetchTree } = store.tree

  const isFiltered = runIsFiltered()
  const personFilter = queryFromTable({ store, table: 'person' })
  const {
    error: errorPerson,
    loading: loadingPerson,
    query: queryOfPerson,
  } = useQuery((store) =>
    store.queryPerson({
      where: { id: { _eq: id } },
    }),
  )
  const { data: dataFiltered } = useQuery((store) =>
    store.queryPerson(
      {
        where: personFilter,
      },
      (d) => d.id,
    ),
  )

  const { data: dataUserRole, loading: loadingUserRole } = useQuery((store) =>
    store.queryUser_role(),
  )
  const userRoleWerte = useMemo(
    () =>
      get(dataUserRole, 'user_role', []).map((el) => ({
        value: el.name,
        label: `${el.name} (${el.comment})`,
      })),
    [dataUserRole],
  )

  const { data: dataPersonAggregate } = useQuery((store) =>
    store.queryPerson_aggregate(undefined, (d) => d.aggregate((d) => d.count)),
  )
  const totalNr = get(
    dataPersonAggregate,
    'person_aggregate.aggregate.count',
    0,
  )
  const filteredNr = get(dataFiltered, 'person', []).length
  const row = showFilter ? filter.person : store.persons.get(id)

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => {
    setActiveConflict(null)
    queryOfPerson.refetch()
  }, [queryOfPerson])
  const callbackAfterUebernehmen = useCallback(() => {
    queryOfPerson.refetch()
    setActiveConflict(row?._rev ?? null)
  }, [queryOfPerson, row?._rev])

  const [errors, setErrors] = useState({})
  useEffect(() => {
    setErrors({})
  }, [id])

  const { data: dataUser } = useQuery((store) =>
    store.queryPerson({
      where: { account_id: { _eq: user.uid } },
    }),
  )
  const { user_role } = get(dataUser, 'person[0]') || {}

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
        return filter.setValue({ table: 'person', key: field, value })
      }
      // first build the part that will be revisioned
      const depth = row._depth + 1
      const newObject = {
        person_id: id,
        nr: field === 'nr' ? toStringIfPossible(value) : row.nr,
        name: field === 'name' ? toStringIfPossible(value) : row.name,
        adresszusatz:
          field === 'adresszusatz'
            ? toStringIfPossible(value)
            : row.adresszusatz,
        strasse: field === 'strasse' ? toStringIfPossible(value) : row.strasse,
        plz: field === 'plz' ? value : row.plz,
        ort: field === 'ort' ? toStringIfPossible(value) : row.ort,
        telefon_privat:
          field === 'telefon_privat'
            ? toStringIfPossible(value)
            : row.telefon_privat,
        telefon_geschaeft:
          field === 'telefon_geschaeft'
            ? toStringIfPossible(value)
            : row.telefon_geschaeft,
        telefon_mobile:
          field === 'telefon_mobile'
            ? toStringIfPossible(value)
            : row.telefon_mobile,
        email: field === 'email' ? toStringIfPossible(value) : row.email,
        kein_email: field === 'kein_email' ? value : row.kein_email,
        bemerkungen:
          field === 'bemerkungen' ? toStringIfPossible(value) : row.bemerkungen,
        account_id:
          field === 'account_id' ? toStringIfPossible(value) : row.account_id,
        user_role:
          field === 'user_role' ? toStringIfPossible(value) : row.user_role,
        kommerziell: field === 'kommerziell' ? value : row.kommerziell,
        info: field === 'info' ? value : row.info,
        aktiv: field === 'aktiv' ? value : row.aktiv,
        changed_by: user.email,
        _parent_rev: row._rev,
        _depth: depth,
      }
      // DO NOT include id in rev - or revs with same data will conflict
      newObject.id = uuidv1()
      const rev = `${depth}-${md5(JSON.stringify(newObject))}`
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
        name: 'mutateInsert_person_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'person_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryPerson',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: id } },
        }),
      })
      // optimistically update store
      upsertPersonModel(newObjectForStore)
      setTimeout(() => {
        // update tree if one of these fields were changed
        if (['name'].includes(field)) {
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
      upsertPersonModel,
      user.email,
    ],
  )

  if (loadingPerson) {
    return (
      <Container>
        <FormTitle title="Person" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (errorPerson) {
    return (
      <Container>
        <FormTitle title="Person" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorPerson.message}`}</FieldsContainer>
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
            title="Person"
            table="person"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Person</Title>
            <TitleSymbols>
              {user_role === 'manager' && (
                <>
                  <AddButton />
                  <DeleteButton row={row} />
                </>
              )}
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
              <Select
                key={`${row.id}${row.user_role}user_role`}
                name="user_role"
                value={row.user_role}
                field="user_role"
                label="Rolle"
                options={userRoleWerte}
                loading={loadingUserRole}
                saveToDb={saveToDb}
                error={errors.user_role}
              />
              <TextField
                key={`${row.id}nr`}
                name="nr"
                label="Nr"
                value={row.nr}
                saveToDb={saveToDb}
                error={errors.nr}
              />
              <TextField
                key={`${row.id}name`}
                name="name"
                label="Name"
                value={row.name}
                saveToDb={saveToDb}
                error={errors.name}
              />
              <TextField
                key={`${row.id}adresszusatz`}
                name="adresszusatz"
                label="Adress-Zusatz"
                value={row.adresszusatz}
                saveToDb={saveToDb}
                error={errors.adresszusatz}
              />
              <TextField
                key={`${row.id}strasse`}
                name="strasse"
                label="Strasse"
                value={row.strasse}
                saveToDb={saveToDb}
                error={errors.strasse}
              />
              <TextField
                key={`${row.id}plz`}
                name="plz"
                label="PLZ"
                value={row.plz}
                saveToDb={saveToDb}
                error={errors.plz}
                type="number"
              />
              <TextField
                key={`${row.id}ort`}
                name="ort"
                label="Ort"
                value={row.ort}
                saveToDb={saveToDb}
                error={errors.ort}
              />
              <TextField
                key={`${row.id}telefon_privat`}
                name="telefon_privat"
                label="Telefon privat"
                value={row.telefon_privat}
                saveToDb={saveToDb}
                error={errors.telefon_privat}
              />
              <TextField
                key={`${row.id}telefon_geschaeft`}
                name="telefon_geschaeft"
                label="Telefon Geschäft"
                value={row.telefon_geschaeft}
                saveToDb={saveToDb}
                error={errors.telefon_geschaeft}
              />
              <TextField
                key={`${row.id}telefon_mobile`}
                name="telefon_mobile"
                label="Telefon mobile"
                value={row.telefon_mobile}
                saveToDb={saveToDb}
                error={errors.telefon_mobile}
              />
              <TextField
                key={`${row.id}email`}
                name="email"
                label="Email"
                value={row.email}
                saveToDb={saveToDb}
                error={errors.email}
              />
              <Checkbox2States
                key={`${row.id}kein_email`}
                label="Kein Email"
                name="kein_email"
                value={row.kein_email}
                saveToDb={saveToDb}
                error={errors.kein_email}
              />
              <Checkbox2States
                key={`${row.id}kommerziell`}
                label="Kommerziell"
                name="kommerziell"
                value={row.kommerziell}
                saveToDb={saveToDb}
                error={errors.kommerziell}
              />
              <Checkbox2States
                key={`${row.id}info`}
                label="Info"
                name="info"
                value={row.info}
                saveToDb={saveToDb}
                error={errors.info}
              />
              <Checkbox2States
                key={`${row.id}aktiv`}
                label="aktiv"
                name="aktiv"
                value={row.aktiv}
                saveToDb={saveToDb}
                error={errors.aktiv}
              />
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
              {row.user_role === 'artverantwortlich' && (
                <Arten personId={row.id} />
              )}
              {!showFilter && row.id && (
                <Files parentId={row.id} parent="person" />
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

export default observer(Person)
