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

const Zaehlung = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { filter, online, kulturIdInActiveNodeArray } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()

  const hierarchyFilter = {}
  if (kulturIdInActiveNodeArray) {
    hierarchyFilter.kultur_id = {
      _eq: kulturIdInActiveNodeArray,
    }
  }
  const zaehlungFilter = { ...store.zaehlungFilter, ...hierarchyFilter }

  const { error, loading } = useQuery((store) =>
    store.queryZaehlung(
      {
        where: { id: { _eq: id } },
      },
      (z) =>
        z.id.kultur_id.kultur((k) =>
          k.id
            .kultur_option((o) => o.id.z_bemerkungen)
            .art((a) => a.id.art_ae_art((ae) => ae.id.name))
            .garten((g) => g.id.name.person((p) => p.id.name)),
        ).datum.prognose.bemerkungen.changed.changed_by._rev._parent_rev
          ._revisions._depth._conflicts,
    ),
  )

  const [errors, setErrors] = useState({})

  const aggregateVariables = Object.keys(hierarchyFilter).length
    ? { where: hierarchyFilter }
    : undefined
  const { data: dataZaehlungAggregate } = useQuery((store) =>
    store.queryZaehlung_aggregate(aggregateVariables, (d) =>
      d.aggregate((d) => d.count),
    ),
  )
  const totalNr =
    dataZaehlungAggregate?.zaehlung_aggregate?.aggregate?.count ?? 0

  const { data: dataZaehlungFilteredAggregate } = useQuery((store) =>
    store.queryZaehlung_aggregate({ where: zaehlungFilter }, (d) =>
      d.aggregate((d) => d.count),
    ),
  )
  const filteredNr =
    dataZaehlungFilteredAggregate?.zaehlung_aggregate?.aggregate?.count ?? 0

  const row = showFilter ? filter.zaehlung : store.zaehlungs.get(id) || {}

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => setActiveConflict(null), [])
  const callbackAfterUebernehmen = useCallback(
    () => setActiveConflict(null),
    [],
  )

  const artId = row?.kultur?.art_id
  const kulturFilter = artId
    ? { art_id: { _eq: artId } }
    : { id: { _is_null: false } }
  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
  } = useQuery((store) =>
    store.queryKultur(
      {
        where: kulturFilter,
        order_by: [
          { garten: { person: { name: 'asc_nulls_first' } } },
          { garten: { person: { ort: 'asc_nulls_first' } } },
        ],
      },
      (k) => k.id.art_id.garten((g) => g.id.name.person((p) => p.id.name.ort)),
    ),
  )

  const { z_bemerkungen } = row?.kultur?.kultur_option ?? {}

  useEffect(() => {
    setErrors({})
  }, [id])

  const kulturWerte = useMemo(
    () =>
      (kulturData?.kultur ?? []).map((el) => ({
        value: el.id,
        label: kulturLabelFromKultur(el),
      })),
    [kulturData?.kultur],
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
