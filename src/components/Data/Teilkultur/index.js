import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from 'styled-components'
import get from 'lodash/get'
import memoizeOne from 'memoize-one'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@material-ui/core/IconButton'
import md5 from 'blueimp-md5'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import toPgArray from '../../../utils/toPgArray'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import {
  kulturOption as kulturOptionFragment,
  teilkultur as teilkulturFragment,
} from '../../../utils/fragments'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Settings from './Settings'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Zaehlungen from './Zaehlungen'
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
`

const teilkulturQuery = gql`
  query TeilkulturQueryForTeilkultur(
    $id: uuid!
    $filter: teilkultur_bool_exp!
    $isFiltered: Boolean!
  ) {
    teilkultur(where: { id: { _eq: $id } }) {
      ...TeilkulturFields
      kultur {
        id
        __typename
        art_id
        kultur_option {
          ...KulturOptionFields
        }
      }
    }
    rowsUnfiltered: teilkultur @include(if: $isFiltered) {
      id
      __typename
    }
    rowsFiltered: teilkultur(where: $filter) @include(if: $isFiltered) {
      id
      __typename
    }
  }
  ${teilkulturFragment}
  ${kulturOptionFragment}
`
// garten.person.name
const kulturQuery = gql`
  query kulturQueryForTk {
    kultur(
      order_by: [
        { garten: { person: { name: asc_nulls_first } } }
        { garten: { person: { ort: asc_nulls_first } } }
        { art: { art_ae_art: { name: asc_nulls_first } } }
      ]
    ) {
      id
      __typename
      art_id
      art {
        id
        __typename
        art_ae_art {
          id
          __typename
          name
        }
      }
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
  }
  ${teilkulturFragment}
`

const Teilkultur = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { filter, user, upsertTeilkultur, addQueuedQuery } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()
  const teilkulturFilter = queryFromTable({ store, table: 'teilkultur' })
  const teilkulturResult = useQuery(teilkulturQuery, {
    variables: { id, isFiltered, filter: teilkulturFilter },
  })
  const { data, error, loading, query } = teilkulturResult

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.teilkultur
  } else {
    row = get(data, 'teilkultur[0]') || {}
  }

  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
  } = useQuery(kulturQuery)

  const { tk_bemerkungen } = get(row, 'kultur.kultur_option', {}) || {}

  useEffect(() => {
    setErrors({})
  }, [id])

  const kulturWerte = memoizeOne(() =>
    get(kulturData, 'kultur', []).map((el) => {
      const personName = get(el, 'garten.person.name') || '(kein Name)'
      const personOrt = get(el, 'garten.person.ort') || null
      const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`
      const gartenName = get(el, 'garten.name') || personLabel
      const artName = get(el, 'art.art_ae_art.name') || '(keine Art)'
      const label = `${gartenName}: ${artName}`

      return {
        value: el.id,
        label,
      }
    }),
  )()

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
        return filter.setValue({ table: 'teilkultur', key: field, value })
      }
      // first build the part that will be revisioned
      const depth = row._depth + 1
      const newObject = {
        id: row.id,
        kultur_id: field === 'kultur_id' ? value : row.kultur_id,
        name: field === 'name' ? value.toString() : row.name,
        ort1: field === 'ort1' ? value.toString() : row.ort1,
        ort2: field === 'ort2' ? value.toString() : row.ort2,
        ort3: field === 'ort3' ? value.toString() : row.ort3,
        bemerkungen:
          field === 'bemerkungen' ? value.toString() : row.bemerkungen,
        changed: new window.Date().toISOString(),
        changed_by: user.email,
        _parent_rev: row._rev,
        _depth: depth,
      }
      const rev = `${depth}-${md5(JSON.stringify(newObject))}`
      newObject._rev = rev
      const newObjectForStore = { ...newObject }
      // convert to string as hasura does not support arrays yet
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
        name: 'mutateInsert_teilkultur_rev',
        variables: JSON.stringify({
          objects: [newObject],
          on_conflict: {
            constraint: 'teilkultur_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryTeilkultur',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: id } },
        }),
      })
      setTimeout(() => {
        // optimistically update store
        upsertTeilkultur(newObjectForStore)
        // refetch query because is not a model instance
        query.refetch()
      }, 50)
    },
    [
      addQueuedQuery,
      upsertTeilkultur,
      filter,
      id,
      row,
      showFilter,
      user,
      query,
    ],
  )
  const openTeilkulturDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Teilkulturen`
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
        <FormTitle title="Teilkultur" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Teilkultur" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }
  if (kulturError) {
    return (
      <Container>
        <FormTitle title="Teilkultur" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${kulturError.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Teilkultur"
            table="teilkultur"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Teilkultur</Title>
            <TitleSymbols>
              <AddButton />
              <DeleteButton row={row} />
              <Settings teilkulturResult={teilkulturResult} />
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openTeilkulturDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
              {(store.filter.show || isFiltered) && (
                <TitleFilterNumbers>{`${filteredNr}/${totalNr}`}</TitleFilterNumbers>
              )}
            </TitleSymbols>
          </TitleContainer>
        )}
        <FieldsContainer>
          <Select
            key={`${row.id}${row.kultur_id}kultur_id`}
            name="kultur_id"
            value={row.kultur_id}
            field="kultur_id"
            label="Kultur"
            options={kulturWerte}
            loading={kulturLoading}
            saveToDb={saveToDb}
            error={errors.kultur_id}
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
            key={`${row.id}ort1`}
            name="ort1"
            label="Ort 1"
            value={row.ort1}
            saveToDb={saveToDb}
            error={errors.ort1}
          />
          <TextField
            key={`${row.id}ort2`}
            name="ort2"
            label="Ort 2"
            value={row.ort2}
            saveToDb={saveToDb}
            error={errors.ort2}
          />
          <TextField
            key={`${row.id}ort3`}
            name="ort3"
            label="Ort 3"
            value={row.ort3}
            saveToDb={saveToDb}
            error={errors.ort3}
          />
          {(tk_bemerkungen || showFilter) && (
            <TextField
              key={`${row.id}bemerkungen`}
              name="bemerkungen"
              label="Bemerkungen"
              value={row.bemerkungen}
              saveToDb={saveToDb}
              error={errors.bemerkungen}
              multiline
            />
          )}
        </FieldsContainer>
        {!showFilter && (
          <Zaehlungen kulturId={row.kultur_id} teilkulturId={row.id} />
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Teilkultur)
