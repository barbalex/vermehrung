import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import SplitPane from 'react-split-pane'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Checkbox2States from '../../shared/Checkbox2States'
import Date from '../../shared/Date'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Teilzaehlungen from './Teilzaehlungen'
import Settings from './Settings'
import AddButton from './AddButton'
import DelteButton from './DeleteButton'
import appBaseUrl from '../../../utils/appBaseUrl'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import kulturLabelFromKultur from '../Teilkultur/kulturLabelFromKultur'
import { zaehlung as zaehlungFragment } from '../../../utils/fragments'

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

const allDataQuery = gql`
  query AllDataQueryForZaehlung(
    $id: uuid!
    $zaehlungFilter: zaehlung_bool_exp!
    $totalCountFilter: zaehlung_bool_exp!
    $kulturFilter: kultur_bool_exp!
  ) {
    zaehlung(where: { id: { _eq: $id } }) {
      ...ZaehlungFields
      kultur {
        id
        __typename
        kultur_option {
          id
          __typename
          z_bemerkungen
        }
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
    zaehlung_total_count: zaehlung_aggregate(where: $totalCountFilter) {
      aggregate {
        count
      }
    }
    zaehlung_filtered_count: zaehlung_aggregate(where: $zaehlungFilter) {
      aggregate {
        count
      }
    }
    kultur {
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
  ${zaehlungFragment}
`

const Zaehlung = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const {
    filter,
    online,
    kulturIdInActiveNodeArray,
    kultursSorted,
    showDeleted,
  } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()

  const hierarchyFilter = {}
  if (kulturIdInActiveNodeArray) {
    hierarchyFilter.kultur_id = {
      _eq: kulturIdInActiveNodeArray,
    }
  }
  const zaehlungFilter = { ...store.zaehlungFilter, ...hierarchyFilter }

  const totalCountFilter = { ...hierarchyFilter }
  if (!showDeleted) {
    totalCountFilter._deleted = { _eq: false }
  }

  const row = showFilter ? filter.zaehlung : store.zaehlungs.get(id) || {}

  const artId = row?.kultur?.art_id
  const kulturFilter = artId
    ? { art_id: { _eq: artId } }
    : { id: { _is_null: false } }

  const { data, error, loading } = useQuery(allDataQuery, {
    variables: {
      id,
      zaehlungFilter,
      totalCountFilter,
      kulturFilter,
    },
  })

  const [errors, setErrors] = useState({})

  const totalNr = data?.zaehlung_total_count?.aggregate?.count
  const filteredNr = data?.zaehlung_filtered_count?.aggregate?.count

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => setActiveConflict(null), [])
  const callbackAfterUebernehmen = useCallback(
    () => setActiveConflict(null),
    [],
  )

  const { z_bemerkungen } = row?.kultur?.kultur_option ?? {}

  useEffect(() => {
    setErrors({})
  }, [id])

  const kulturWerte = useMemo(
    () =>
      kultursSorted
        .filter((k) => {
          if (row.art_id) return k.art_id === row.art_id
          return true
        })
        .map((el) => ({
          value: el.id,
          label: kulturLabelFromKultur(el),
        })),
    [kultursSorted, row.art_id],
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
  const openZaehlungDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Zaehlungen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  if (loading && !Object.keys(row).length) {
    return (
      <Container>
        <FormTitle title="Zaehlung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Zaehlung" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${error.message}`}</FieldsContainer>
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
                  <Settings kulturId={row.kultur_id} zaehlungId={id} />
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
                  loading={loading}
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
                {!showFilter && <Teilzaehlungen zaehlungId={id} />}
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
