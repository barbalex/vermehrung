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
import TextField from '../../shared/TextField'
import Checkbox2States from '../../shared/Checkbox2States'
import Checkbox3States from '../../shared/Checkbox3States'
import Date from '../../shared/Date'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Teilzaehlungen from './Teilzaehlungen'
import getConstants from '../../../utils/constants'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import kulturLabelFromKultur from '../Teilkultur/kulturLabelFromKultur'
import FormTitle from './FormTitle'

const constants = getConstants()

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
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

const Zaehlung = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { filter, online, kultursSorted, errors, unsetError } = store

  const row = useMemo(
    () => (showFilter ? filter.zaehlung : store.zaehlungs.get(id) || {}),
    [filter.zaehlung, id, showFilter, store.zaehlungs],
  )

  const [activeConflict, setActiveConflict] = useState(null)
  const conflictDisposalCallback = useCallback(
    () => setActiveConflict(null),
    [],
  )
  const conflictSelectionCallback = useCallback(
    () => setActiveConflict(null),
    [],
  )
  // ensure that activeConflict is reset
  // when changing dataset
  useEffect(() => {
    setActiveConflict(null)
  }, [id])

  const { z_bemerkungen } = row?.kultur?.kultur_option ?? {}

  useEffect(() => {
    unsetError('zaehlung')
  }, [id, unsetError])

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

      if (showFilter) {
        return filter.setValue({ table: 'zaehlung', key: field, value })
      }

      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
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

  const showDeleted = showFilter || row._deleted

  const [showHistory, setShowHistory] = useState(null)
  const historyTakeoverCallback = useCallback(() => setShowHistory(null), [])

  if (!row || (!showFilter && filter.show)) return null

  const paneIsSplit = online && (activeConflict || showHistory)

  const firstPaneWidth = paneIsSplit ? '50%' : '100%'
  // hide resizer when tree is hidden
  const resizerStyle = !paneIsSplit ? { width: 0 } : {}

  return (
    <ErrorBoundary>
      <>
        <Container showfilter={showFilter}>
          <FormTitle
            row={row}
            showFilter={showFilter}
            showHistory={showHistory}
            setShowHistory={setShowHistory}
          />
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
                  <>
                    {showFilter ? (
                      <Checkbox3States
                        key={`${row.id}_deleted`}
                        label="gelöscht"
                        name="_deleted"
                        value={row._deleted}
                        saveToDb={saveToDb}
                        error={errors?.zaehlung?._deleted}
                      />
                    ) : (
                      <Checkbox2States
                        key={`${row.id}_deleted`}
                        label="gelöscht"
                        name="_deleted"
                        value={row._deleted}
                        saveToDb={saveToDb}
                        error={errors?.zaehlung?._deleted}
                      />
                    )}
                  </>
                )}
                <Select
                  key={`${row.id}${row.kultur_id}kultur_id`}
                  name="kultur_id"
                  value={row.kultur_id}
                  field="kultur_id"
                  label="Kultur"
                  options={kulturWerte}
                  loading={false}
                  saveToDb={saveToDb}
                  error={errors?.zaehlung?.kultur_id}
                />
                <Date
                  key={`${row.id}datum`}
                  name="datum"
                  label="Datum"
                  value={row.datum}
                  saveToDb={saveToDb}
                  error={errors?.zaehlung?.datum}
                />
                <FieldRow>
                  {showFilter ? (
                    <Checkbox3States
                      key={`${row.id}prognose`}
                      label="Prognose"
                      name="prognose"
                      value={row.prognose}
                      saveToDb={saveToDb}
                      error={errors?.zaehlung?.prognose}
                    />
                  ) : (
                    <Checkbox2States
                      key={`${row.id}prognose`}
                      label="Prognose"
                      name="prognose"
                      value={row.prognose}
                      saveToDb={saveToDb}
                      error={errors?.zaehlung?.prognose}
                    />
                  )}
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
                    error={errors?.zaehlung?.bemerkungen}
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
                    conflictDisposalCallback={conflictDisposalCallback}
                    conflictSelectionCallback={conflictSelectionCallback}
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
