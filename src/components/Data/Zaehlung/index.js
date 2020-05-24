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
import { v1 as uuidv1 } from 'uuid'
import SplitPane from 'react-split-pane'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import toPgArray from '../../../utils/toPgArray'
import toStringIfPossible from '../../../utils/toStringIfPossible'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Checkbox2States from '../../shared/Checkbox2States'
import Date from '../../shared/Date'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import {
  zaehlung as zaehlungFragment,
  kulturOption as kulturOptionFragment,
} from '../../../utils/fragments'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Teilzaehlungen from './Teilzaehlungen'
import Settings from './Settings'
import AddButton from './AddButton'
import DelteButton from './DeleteButton'
import appBaseUrl from '../../../utils/appBaseUrl'
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
const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
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

const zaehlungQuery = gql`
  query ZaehlungQueryForZaehlung(
    $id: uuid!
    $isFiltered: Boolean!
    $filter: zaehlung_bool_exp!
  ) {
    zaehlung(where: { id: { _eq: $id } }) {
      ...ZaehlungFields
      kultur {
        id
        __typename
        art_id
        kultur_option {
          ...KulturOptionFields
        }
        garten {
          id
          __typename
          name
          person {
            id
            __typename
            name
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
      }
    }
    rowsUnfiltered: zaehlung @include(if: $isFiltered) {
      id
      __typename
    }
    rowsFiltered: zaehlung(where: $filter) @include(if: $isFiltered) {
      id
      __typename
    }
  }
  ${zaehlungFragment}
  ${kulturOptionFragment}
`
const kulturQuery = gql`
  query kulturQueryForZaehlung($filter: kultur_bool_exp!) {
    kultur(
      where: $filter
      order_by: [
        { garten: { person: { name: asc_nulls_first } } }
        { garten: { person: { ort: asc_nulls_first } } }
      ]
    ) {
      id
      __typename
      art_id
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
  ${kulturOptionFragment}
`

const Zaehlung = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { filter, upsertZaehlung, addQueuedQuery, user, online } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()
  const zaehlungFilter = queryFromTable({ store, table: 'zaehlung' })
  const zaehlungResult = useQuery(zaehlungQuery, {
    variables: { id, isFiltered, filter: zaehlungFilter },
  })
  const { data, error, loading, query: queryOfZaehlung } = zaehlungResult

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.zaehlung
  } else {
    row = get(data, 'zaehlung[0]') || {}
  }

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => {
    setActiveConflict(null)
    queryOfZaehlung.refetch()
  }, [queryOfZaehlung])
  const callbackAfterUebernehmen = useCallback(() => {
    queryOfZaehlung.refetch()
    setActiveConflict(row?._rev ?? null)
  }, [queryOfZaehlung, row?._rev])

  const artId = get(row, 'kultur.art_id')
  const kulturFilter = artId
    ? { art_id: { _eq: artId } }
    : { id: { _is_null: false } }
  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
  } = useQuery(kulturQuery, {
    variables: {
      filter: kulturFilter,
    },
  })

  const { z_bemerkungen } = get(row, 'kultur.kultur_option') || {}

  useEffect(() => {
    setErrors({})
  }, [id])

  const kulturWerte = useMemo(
    () =>
      get(kulturData, 'kultur', []).map((el) => {
        const personName = get(el, 'garten.person.name') || '(kein Name)'
        const personOrt = get(el, 'garten.person.ort') || null
        const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`
        const label = get(el, 'garten.name') || personLabel

        return {
          value: el.id,
          label,
        }
      }),
    [kulturData],
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
        return filter.setValue({ table: 'zaehlung', key: field, value })
      }
      // first build the part that will be revisioned
      const depth = row._depth + 1
      const newObject = {
        zaehlung_id: row.id,
        kultur_id: field === 'kultur_id' ? value : row.kultur_id,
        datum: field === 'datum' ? value : row.datum,
        prognose: field === 'prognose' ? value : row.prognose,
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
        name: 'mutateInsert_zaehlung_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'zaehlung_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryZaehlung',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: id } },
        }),
      })
      setTimeout(() => {
        // optimistically update store
        upsertZaehlung(newObjectForStore)
        // refetch query because is not a model instance
        queryOfZaehlung.refetch()
      }, 50)
    },
    [
      addQueuedQuery,
      upsertZaehlung,
      filter,
      id,
      row,
      showFilter,
      user,
      queryOfZaehlung,
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
  const openZaehlungDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Zaehlungen`
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
        <FormTitle title="Zaehlung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error || kulturError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Zaehlung" />
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
      <>
        <Container showfilter={showFilter}>
          {showFilter ? (
            <FilterTitle
              title="Zählung"
              table="zaehlung"
              totalNr={totalNr}
              filteredNr={filteredNr}
            />
          ) : (
            <TitleContainer>
              <Title>Zählung</Title>
              <TitleSymbols>
                <AddButton />
                <DelteButton row={row} />
                {row.kultur_id && (
                  <Settings
                    kulturId={row.kultur_id}
                    zaehlungResult={zaehlungResult}
                  />
                )}
                <IconButton
                  aria-label="Anleitung öffnen"
                  title="Anleitung öffnen"
                  onClick={openZaehlungDocs}
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
                <Date
                  key={`${row.id}datum`}
                  name="datum"
                  label="Datum"
                  value={row.datum}
                  saveToDb={saveToDb}
                  error={errors.datum}
                />
                <FieldRow>
                  <Checkbox2States
                    key={`${row.id}prognose`}
                    label="Prognose"
                    name="prognose"
                    value={row.prognose}
                    saveToDb={saveToDb}
                    error={errors.prognose}
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
                {(z_bemerkungen || showFilter) && (
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
                  <Teilzaehlungen zaehlungResult={zaehlungResult} />
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
      </>
    </ErrorBoundary>
  )
}

export default observer(Zaehlung)
