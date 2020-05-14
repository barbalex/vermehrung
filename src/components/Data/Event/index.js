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
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import md5 from 'blueimp-md5'
import moment from 'moment'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import Select from '../../shared/Select'
import SelectCreatable from '../../shared/SelectCreatable'
import TextField from '../../shared/TextField'
import Date from '../../shared/Date'
import Checkbox2States from '../../shared/Checkbox2States'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import {
  event as eventFragment,
  kulturOption as kulturOptionFragment,
  teilkultur as teilkulturFragment,
} from '../../../utils/fragments'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import toPgArray from '../../../utils/toPgArray'
import queryFromTable from '../../../utils/queryFromTable'
import Settings from './Settings'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
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
const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  > div > button {
    margin-top: 8px;
  }
`

const eventQuery = gql`
  query EventQueryForEvent(
    $id: uuid!
    $filter: event_bool_exp!
    $isFiltered: Boolean!
  ) {
    event(where: { id: { _eq: $id } }) {
      ...EventFields
      kultur {
        id
        art_id
        kultur_option {
          ...KulturOptionFields
        }
      }
    }
    rowsUnfiltered: event @include(if: $isFiltered) {
      id
    }
    rowsFiltered: event(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${eventFragment}
  ${kulturOptionFragment}
`
// garten.person.name
const kulturQuery = gql`
  query kulturQueryForEvent {
    kultur(
      order_by: [
        { garten: { person: { name: asc_nulls_first } } }
        { garten: { person: { ort: asc_nulls_first } } }
        { art: { art_ae_art: { name: asc_nulls_first } } }
      ]
    ) {
      id
      art_id
      art {
        id
        art_ae_art {
          id
          name
        }
      }
      garten {
        id
        name
        person {
          id
          name
          ort
        }
      }
      teilkulturs(order_by: { name: asc_nulls_last }) {
        ...TeilkulturFields
      }
    }
  }
  ${eventFragment}
  ${teilkulturFragment}
`
const personQuery = gql`
  query personQueryForEvent {
    person(order_by: [{ name: asc_nulls_first }, { ort: asc_nulls_first }]) {
      id
      name
      ort
    }
  }
`

const Event = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { filter, upsertEvent, addQueuedQuery, user } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()
  const eventFilter = queryFromTable({ store, table: 'event' })
  const eventResult = useQuery(eventQuery, {
    variables: { id, isFiltered, filter: eventFilter },
  })
  const { data, error, loading, query } = eventResult

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.event
  } else {
    row = get(data, 'event[0]') || {}
  }

  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
    refetch: refetchKultur,
  } = useQuery(kulturQuery)
  const {
    data: personData,
    error: personError,
    loading: personLoading,
  } = useQuery(personQuery)

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const kulturs = get(kulturData, 'kultur', []) || []
  const kulturWerte = useMemo(
    () =>
      kulturs.map((el) => {
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
    [kulturs],
  )
  const teilkulturWerte = useMemo(() => {
    const kultur = kulturs.find((k) => k.id === row.kultur_id)
    const tks = get(kultur, 'teilkulturs', []) || []
    return tks.map((t) => ({
      value: t.id,
      label: t.name || '(kein Name)',
    }))
  }, [kulturs, row.kultur_id])

  const personWerte = useMemo(
    () =>
      get(personData, 'person', []).map((el) => ({
        value: el.id,
        label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personData],
  )

  const { tk, ev_datum, ev_teilkultur_id, ev_geplant, ev_person_id } =
    get(row, 'kultur.kultur_option') || {}

  const saveToDb = useCallback(
    (event) => {
      const field = event.target.name
      // TODO: still necessary?
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return

      if (showFilter) {
        return filter.setValue({ table: 'event', key: field, value })
      }
      // first build the part that will be revisioned
      const depth = row._depth + 1
      const newObject = {
        id,
        kultur_id: field === 'kultur_id' ? value : row.kultur_id,
        teilkultur_id: field === 'teilkultur_id' ? value : row.teilkultur_id,
        person_id: field === 'person_id' ? value : row.person_id,
        beschreibung: field === 'beschreibung' ? value : row.beschreibung,
        geplant: field === 'geplant' ? value : row.geplant,
        datum: field === 'datum' ? value : row.datum,
        changed: moment().format('YYYY-MM-DD'), //'2000-05-03',
        changed_by: user.email,
        _parent_rev: row._rev,
        _depth: depth,
      }
      const rev = `${depth}-${md5(newObject.toString())}`
      newObject._rev = rev
      // convert array to string as hasura does not support arrays yet
      // https://github.com/hasura/graphql-engine/pull/2243
      newObject._revisions = row._revisions
        ? toPgArray([rev, ...row._revisions])
        : toPgArray([rev])
      addQueuedQuery({
        name: 'mutateInsert_event_rev',
        variables: JSON.stringify({
          objects: [newObject],
          on_conflict: {
            constraint: 'event_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryEvent',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: id } },
        }),
      })
      setTimeout(() => {
        // optimistically update store
        upsertEvent(newObject)
        // refetch query because is not a model instance
        query.refetch()
      }, 100)
    },
    [addQueuedQuery, upsertEvent, filter, id, row, showFilter, user, query],
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
  const openEventdDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Events`
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
        <FormTitle title="Event" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Event" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
      </Container>
    )
  }
  if (kulturError) {
    return (
      <Container>
        <FormTitle title="Event" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${kulturError.message}`}</FieldsContainer>
      </Container>
    )
  }
  if (personError) {
    return (
      <Container>
        <FormTitle title="Event" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${personError.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Event"
            table="event"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Event</Title>
            <TitleSymbols>
              <AddButton />
              <DeleteButton row={row} />
              {row.kultur_id && (
                <Settings kulturId={row.kultur_id} eventResult={eventResult} />
              )}
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openEventdDocs}
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
          {((tk && ev_teilkultur_id) || showFilter) && (
            <SelectCreatable
              key={`${row.id}teilkultur_id`}
              name="teilkultur_id"
              value={row.teilkultur_id}
              field="teilkultur_id"
              label="Teilkultur"
              options={teilkulturWerte}
              loading={kulturLoading}
              saveToDb={saveToDb}
              error={errors.teilkultur_id}
              creatablePropertiesToPass={{ kultur_id: row.kultur_id }}
              creatablePropertyName="name"
              creatableIdField="id"
              table="teilkultur"
              callback={refetchKultur}
            />
          )}
          <TextField
            key={`${row.id}beschreibung`}
            name="beschreibung"
            label="Beschreibung"
            value={row.beschreibung}
            saveToDb={saveToDb}
            error={errors.beschreibung}
            multiline
          />
          {(ev_person_id || showFilter) && (
            <Select
              key={`${row.id}${row.person_id}person_id`}
              name="person_id"
              value={row.person_id}
              field="person_id"
              label="Wer"
              options={personWerte}
              loading={personLoading}
              saveToDb={saveToDb}
              error={errors.person_id}
            />
          )}
          {(ev_datum || showFilter) && (
            <Date
              key={`${row.id}datum`}
              name="datum"
              label="Datum"
              value={row.datum}
              saveToDb={saveToDb}
              error={errors.datum}
            />
          )}
          {(ev_geplant || showFilter) && (
            <FieldRow>
              <Checkbox2States
                key={`${row.id}geplant`}
                label="geplant"
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
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Event)
