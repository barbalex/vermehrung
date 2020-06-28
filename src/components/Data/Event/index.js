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

import { StoreContext } from '../../../models/reactUtils'
import Select from '../../shared/Select'
import SelectCreatable from '../../shared/SelectCreatable'
import TextField from '../../shared/TextField'
import Date from '../../shared/Date'
import Checkbox2States from '../../shared/Checkbox2States'
import FilterTitle from '../../shared/FilterTitle'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Settings from './Settings'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import kulturLabelFromKultur from './kulturLabelFromKultur'
import getConstants from '../../../utils/constants'

const constants = getConstants()

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
  height: calc(100vh - 64px - 48px) !important;
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

const Event = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const {
    filter,
    online,
    insertTeilkulturRev,
    kulturIdInActiveNodeArray,
    eventsSorted,
    eventsFiltered,
    kultursSorted,
    personsSorted,
    teilkultursSorted,
    showDeleted,
    errors,
    unsetError,
  } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()

  const hierarchyFilter = (e) => {
    if (kulturIdInActiveNodeArray)
      return e.kultur_id === kulturIdInActiveNodeArray
    return true
  }
  const totalNr = eventsSorted.filter(hierarchyFilter).length
  const filteredNr = eventsFiltered.filter(hierarchyFilter).length

  const row = showFilter ? filter.event : store.events.get(id) || {}

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => setActiveConflict(null), [])
  const callbackAfterUebernehmen = useCallback(
    () => setActiveConflict(null),
    [],
  )

  useEffect(() => {
    unsetError('event')
  }, [id, unsetError])

  const kulturWerte = useMemo(
    () =>
      kultursSorted.map((el) => ({
        value: el.id,
        label: kulturLabelFromKultur(el),
      })),
    [kultursSorted],
  )

  const teilkulturWerte = useMemo(
    () =>
      teilkultursSorted
        .filter((t) => t.kultur_id === row?.kultur_id)
        .map((t) => ({
          value: t.id,
          label: t.name || '(kein Name)',
        })),
    [row?.kultur_id, teilkultursSorted],
  )

  const personWerte = useMemo(
    () =>
      personsSorted.map((el) => ({
        value: el.id,
        label: `${el.fullname || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personsSorted],
  )

  const kulturOption = store.kultur_options.get(row?.kultur_id) || {}
  const {
    tk,
    ev_datum,
    ev_teilkultur_id,
    ev_geplant,
    ev_person_id,
  } = kulturOption

  const saveToDb = useCallback(
    (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const previousValue = row?.[field]
      // only update if value has changed
      if (value === previousValue) return

      if (showFilter) {
        return filter.setValue({ table: 'event', key: field, value })
      }
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )
  const openPlanenDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Planen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  const openEventdDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Events`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  const onCreateNewTeilkultur = useCallback(
    ({ name }) => {
      const teilkultur_id = insertTeilkulturRev({
        noNavigateInTree: true,
        values: {
          name,
          kultur_id: row.kultur_id,
        },
      })
      row.edit({ field: 'teilkultur_id', value: teilkultur_id })
    },
    [insertTeilkulturRev, row],
  )

  if (!row || (!showFilter && filter.show)) return null

  const firstPaneWidth = activeConflict ? '50%' : '100%'
  // hide resizer when tree is hidden
  const resizerStyle = !activeConflict ? { width: 0 } : {}

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
              {row.kultur_id && <Settings kulturId={row.kultur_id} />}
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
              {showDeleted && (
                <Checkbox2States
                  key={`${row.id}_deleted`}
                  label="gelöscht"
                  name="_deleted"
                  value={row._deleted}
                  saveToDb={saveToDb}
                  error={errors?.event?._deleted}
                />
              )}
              <Select
                key={`${row.id}${row.kultur_id}kultur_id`}
                name="kultur_id"
                value={row.kultur_id}
                field="kultur_id"
                label="Kultur"
                options={kulturWerte}
                saveToDb={saveToDb}
                error={errors?.event?.kultur_id}
              />
              {((tk && ev_teilkultur_id) || showFilter) && (
                <SelectCreatable
                  key={`${row.id}${row.teilkultur_id}teilkultur_id`}
                  row={row}
                  field="teilkultur_id"
                  label="Teilkultur"
                  options={teilkulturWerte}
                  error={errors?.event?.teilkultur_id}
                  onCreateNew={onCreateNewTeilkultur}
                />
              )}
              <TextField
                key={`${row.id}beschreibung`}
                name="beschreibung"
                label="Beschreibung"
                value={row.beschreibung}
                saveToDb={saveToDb}
                error={errors?.event?.beschreibung}
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
                  saveToDb={saveToDb}
                  error={errors?.event?.person_id}
                />
              )}
              {(ev_datum || showFilter) && (
                <Date
                  key={`${row.id}datum`}
                  name="datum"
                  label="Datum"
                  value={row.datum}
                  saveToDb={saveToDb}
                  error={errors?.event?.datum}
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
                    error={errors?.event?.geplant}
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

export default observer(Event)
