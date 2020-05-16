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

import { useQuery, StoreContext } from '../../../models/reactUtils'
import toPgArray from '../../../utils/toPgArray'
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

const Person = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)

  const { filter, upsertPerson, addQueuedQuery, user } = store
  const { isFiltered: runIsFiltered } = filter
  const { refetch: refetchTree } = store.tree

  const isFiltered = runIsFiltered()
  const personFilter = queryFromTable({ store, table: 'person' })
  const { error: errorPerson, loading: loadingPerson } = useQuery((store) =>
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
  console.log('Person:', { row })

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
        id,
        nr: field === 'nr' ? value.toString() : row.nr,
        name: field === 'name' ? value.toString() : row.name,
        adresszusatz:
          field === 'adresszusatz' ? value.toString() : row.adresszusatz,
        strasse: field === 'strasse' ? value.toString() : row.strasse,
        plz: field === 'plz' ? value : row.plz,
        ort: field === 'ort' ? value.toString() : row.ort,
        telefon_privat:
          field === 'telefon_privat' ? value.toString() : row.telefon_privat,
        telefon_geschaeft:
          field === 'telefon_geschaeft'
            ? value.toString()
            : row.telefon_geschaeft,
        telefon_mobile:
          field === 'telefon_mobile' ? value.toString() : row.telefon_mobile,
        email: field === 'email' ? value.toString() : row.email,
        kein_email: field === 'kein_email' ? value : row.kein_email,
        bemerkungen:
          field === 'bemerkungen' ? value.toString() : row.bemerkungen,
        account_id: field === 'account_id' ? value.toString() : row.account_id,
        user_role: field === 'user_role' ? value.toString() : row.user_role,
        kommerziell: field === 'kommerziell' ? value : row.kommerziell,
        info: field === 'info' ? value : row.info,
        aktiv: field === 'aktiv' ? value : row.aktiv,
        changed: new window.Date().toISOString(),
        changed_by: user.email,
        _parent_rev: row._rev,
        _depth: depth,
      }
      const rev = `${depth}-${md5(JSON.stringify(newObject))}`
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
        name: 'mutateInsert_person_rev',
        variables: JSON.stringify({
          objects: [newObject],
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
      setTimeout(() => {
        // optimistically update store
        upsertPerson(newObjectForStore)
        // update tree if one of these fields were changed
        if (['name'].includes(field)) {
          refetchTree()
        }
        console.log('Person, saveToDb', { newObject, field, value })
      }, 100)
    },
    [
      addQueuedQuery,
      filter,
      id,
      refetchTree,
      row,
      showFilter,
      upsertPerson,
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
        <FieldsContainer>
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
          {row.user_role === 'artverantwortlich' && <Arten personId={row.id} />}
          {!showFilter && row.id && <Files parentId={row.id} parent="person" />}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Person)
