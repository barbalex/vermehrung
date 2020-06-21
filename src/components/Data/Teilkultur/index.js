import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@material-ui/core/IconButton'
import SplitPane from 'react-split-pane'

import { StoreContext } from '../../../models/reactUtils'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Checkbox2States from '../../shared/Checkbox2States'
import FilterTitle from '../../shared/FilterTitle'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Settings from './Settings'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Zaehlungen from './Zaehlungen'
import appBaseUrl from '../../../utils/appBaseUrl'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import kulturLabelFromKultur from './kulturLabelFromKultur'

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
  height: 100%;
  overflow: auto !important;
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

const Teilkultur = ({
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
    teilkultursSorted,
    teilkultursFiltered,
    errors,
    unsetError,
  } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()
  const row = showFilter ? filter.teilkultur : store.teilkulturs.get(id) || {}

  const hierarchyFilter = (r) => {
    if (kulturIdInActiveNodeArray) {
      return r.kultur_id === kulturIdInActiveNodeArray
    }
    return true
  }

  const totalNr = teilkultursSorted.filter(hierarchyFilter).length
  const filteredNr = teilkultursFiltered.filter(hierarchyFilter).length

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => setActiveConflict(null), [])
  const callbackAfterUebernehmen = useCallback(
    () => setActiveConflict(null),
    [],
  )

  const kulturOpion = store.kultur_options.get(row.kultur_id) || {}
  const { tk_bemerkungen } = kulturOpion

  useEffect(() => {
    unsetError('teilkultur')
  }, [id, unsetError])

  const kulturWerte = useMemo(
    () =>
      kultursSorted.map((el) => ({
        value: el.id,
        label: kulturLabelFromKultur(el),
      })),
    [kultursSorted],
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
        return filter.setValue({ table: 'teilkultur', key: field, value })
      }
      row.edit({ field, value })
    },
    [filter, row, showFilter],
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

  if (!row || (!showFilter && filter.show)) return null

  const firstPaneWidth = activeConflict ? '50%' : '100%'
  // hide resizer when tree is hidden
  const resizerStyle = !activeConflict ? { width: 0 } : {}

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
              <Settings kulturId={row.kultur_id} />
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
                  error={errors?.teilkultur?._deleted}
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
                error={errors?.teilkultur?.kultur_id}
              />
              <TextField
                key={`${row.id}name`}
                name="name"
                label="Name"
                value={row.name}
                saveToDb={saveToDb}
                error={errors?.teilkultur?.name}
              />
              <TextField
                key={`${row.id}ort1`}
                name="ort1"
                label="Ort 1"
                value={row.ort1}
                saveToDb={saveToDb}
                error={errors?.teilkultur?.ort1}
              />
              <TextField
                key={`${row.id}ort2`}
                name="ort2"
                label="Ort 2"
                value={row.ort2}
                saveToDb={saveToDb}
                error={errors?.teilkultur?.ort2}
              />
              <TextField
                key={`${row.id}ort3`}
                name="ort3"
                label="Ort 3"
                value={row.ort3}
                saveToDb={saveToDb}
                error={errors?.teilkultur?.ort3}
              />
              {(tk_bemerkungen || showFilter) && (
                <TextField
                  key={`${row.id}bemerkungen`}
                  name="bemerkungen"
                  label="Bemerkungen"
                  value={row.bemerkungen}
                  saveToDb={saveToDb}
                  error={errors?.teilkultur?.bemerkungen}
                  multiline
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
                <Zaehlungen kulturId={row.kultur_id} teilkulturId={row.id} />
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

export default observer(Teilkultur)
