import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from 'styled-components'
import get from 'lodash/get'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import md5 from 'blueimp-md5'
import moment from 'moment'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import toPgArray from '../../../utils/toPgArray'
import TextField from '../../shared/TextField'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import { personOption as personOptionFragment } from '../../../utils/fragments'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Coordinates from '../../shared/Coordinates'
import Settings from './Settings'
import appBaseUrl from '../../../utils/appBaseUrl'
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

const personOptionQuery = gql`
  query PersonOptionQueryForHerkunft($accountId: String) {
    person_option(where: { person: { account_id: { _eq: $accountId } } }) {
      ...PersonOptionFields
    }
  }
  ${personOptionFragment}
`

const Herkunft = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { filter, user, upsertHerkunft, addQueuedQuery } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()
  const herkunftFilter = queryFromTable({ store, table: 'herkunft' })
  // this does not work as not re-queried when id changes
  // see: https://github.com/mobxjs/mst-gql/issues/162
  /*const {
    data: dataHerkunft,
    error: errorHerkunft,
    loading: loadingHerkunft,
  } = useQuery((store) =>
    store.queryHerkunft({
      where: { id: { _eq: id } },
    }),
  )*/
  const {
    data: dataAll,
    error: errorAll,
    loading: loadingAll,
    query: queryAll,
  } = useQuery((store) => store.queryHerkunft())
  const { data: dataFiltered } = useQuery((store) =>
    store.queryHerkunft(
      {
        where: herkunftFilter,
      },
      (d) => d.id,
    ),
  )
  const { data: dataHerkunftAggregate } = useQuery((store) =>
    store.queryHerkunft_aggregate(undefined, (d) =>
      d.aggregate((d) => d.count),
    ),
  )

  const allRows = get(dataAll, 'herkunft', [])
  const row = showFilter
    ? filter.herkunft
    : //: get(dataHerkunft, 'herkunft[0]') || {}
      allRows.find((r) => r.id === id) || {}
  const totalNr = get(
    dataHerkunftAggregate,
    'herkunft_aggregate.aggregate.count',
    0,
  )
  const filteredNr = get(dataFiltered, 'herkunft', []).length
  //console.log('Herkunft, row:', row)

  const personOptionResult = useQuery(personOptionQuery, {
    variables: { accountId: user.uid },
  })
  const { hk_kanton, hk_land, hk_bemerkungen, hk_geom_point, id: person_id } =
    get(personOptionResult.data, 'person_option[0]') || {}

  const [errors, setErrors] = useState({})
  useEffect(() => {
    setErrors({})
  }, [row.id])

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
      // first build the part that will be revisioned
      const depth = row._depth + 1
      const newObject = {
        id: row.id,
        nr: field === 'nr' ? value.toString() : row.nr,
        lokalname: field === 'lokalname' ? value.toString() : row.lokalname,
        gemeinde: field === 'gemeinde' ? value.toString() : row.gemeinde,
        kanton: field === 'kanton' ? value.toString() : row.kanton,
        land: field === 'land' ? value.toString() : row.land,
        bemerkungen:
          field === 'bemerkungen' ? value.toString() : row.bemerkungen,
        changed: new Date().toISOString(),
        changed_by: user.email,
        _parent_rev: row._rev,
        _depth: depth,
      }
      console.log('Herkunft, saveToDb', {
        eventTargetValue: event.target.value,
        value,
        previousValue,
        field,
        newObject,
      })
      const rev = `${depth}-${md5(newObject.toString())}`
      newObject._rev = rev
      // convert to string as hasura does not support arrays yet
      // https://github.com/hasura/graphql-engine/pull/2243
      newObject._revisions = row._revisions
        ? toPgArray([rev, ...row._revisions])
        : toPgArray([rev])
      addQueuedQuery({
        name: 'mutateInsert_herkunft_rev',
        variables: JSON.stringify({
          objects: [newObject],
          on_conflict: {
            constraint: 'herkunft_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryHerkunft',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: id } },
        }),
      })
      setTimeout(() => {
        // optimistically update store
        upsertHerkunft(newObject)
        // refetch query because is not a model instance
        queryAll.refetch()
      }, 50)
    },
    [
      addQueuedQuery,
      upsertHerkunft,
      filter,
      id,
      row,
      showFilter,
      user,
      queryAll,
    ],
  )

  /*const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const type = types.herkunft[field]
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      if (showFilter) {
        filter.setValue({ table: 'herkunft', key: field, value })
      } else {
        try {
          let valueToSet
          if (value === null) {
            valueToSet = null
          } else if (['number', 'boolean'].includes(type)) {
            valueToSet = value
          } else {
            valueToSet = `"${
              value.split
                ? value.split
                  ? value.split('"').join('\\"')
                  : value
                : value
            }"`
          }
          await client.mutate({
            mutation: gql`
              mutation update_herkunft(
                $id: uuid!
              ) {
                update_herkunft(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...HerkunftFields
                  }
                }
              }
              ${herkunftFragment}
            `,
            variables: {
              id: row.id,
            },
            optimisticResponse: {
              __typename: 'Mutation',
              updateHerkunft: {
                id: row.id,
                __typename: 'Herkunft',
                content: { ...row, [field]: valueToSet },
              },
            },
          })
        } catch (error) {
          return setErrors({ [field]: error.message })
        }
        setErrors({})
      }
    },
    [client, filter, row, showFilter],
  )*/
  const openHerkunftDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Herkuenfte`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  if (loadingAll) {
    return (
      <Container>
        <FormTitle title="Herkunft" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (errorAll) {
    return (
      <Container>
        <FormTitle title="Herkunft" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorAll.message}`}</FieldsContainer>
      </Container>
    )
  }

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
            <Coordinates
              row={row}
              refetchForm={queryAll.refetch}
              table="herkunft"
            />
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
          {!showFilter && row.id && (
            <Files parentId={row.id} parent="herkunft" />
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Herkunft)
