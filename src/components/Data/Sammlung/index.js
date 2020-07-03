import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'

import { StoreContext } from '../../../models/reactUtils'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Date from '../../shared/Date'
import FilterTitle from '../../shared/FilterTitle'
import Checkbox2States from '../../shared/Checkbox2States'
import Coordinates from '../../shared/Coordinates'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import getConstants from '../../../utils/constants'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import herkunftLabelFromHerkunft from './herkunftLabelFromHerkunft'
import exists from '../../../utils/exists'
import UpSvg from '../../../svg/to_up.inline.svg'
import LiDownSvg from '../../../svg/to_ausli_down.inline.svg'
import HeDownSvg from '../../../svg/to_he_down.inline.svg'

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
  > div:not(:last-of-type) {
    padding-right: 8px;
  }
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

const Sammlung = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const {
    filter,
    online,
    artIdInActiveNodeArray,
    herkunftIdInActiveNodeArray,
    personIdInActiveNodeArray,
    artsSorted,
    herkunftsSorted,
    personsSorted,
    sammlungsFiltered,
    sammlungsSorted,
    showDeleted,
    errors,
    unsetError,
    setError,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const isFiltered = runIsFiltered()

  const hierarchyFilter = (s) => {
    if (artIdInActiveNodeArray) {
      return s.art_id === artIdInActiveNodeArray
    }
    if (herkunftIdInActiveNodeArray) {
      return s.herkunft_id === herkunftIdInActiveNodeArray
    }
    if (personIdInActiveNodeArray) {
      return s.person_id === personIdInActiveNodeArray
    }
    return true
  }

  const totalNr = sammlungsSorted.filter(hierarchyFilter).length
  const filteredNr = sammlungsFiltered.filter(hierarchyFilter).length

  const row = showFilter ? filter.sammlung : store.sammlungs.get(id) ?? {}

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => setActiveConflict(null), [])
  const callbackAfterUebernehmen = useCallback(
    () => setActiveConflict(null),
    [],
  )

  useEffect(() => {
    unsetError('sammlung')
  }, [id, unsetError])

  const personWerte = useMemo(
    () =>
      personsSorted.map((el) => ({
        value: el.id,
        label: `${el.fullname || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personsSorted],
  )

  const herkunftWerte = useMemo(
    () =>
      herkunftsSorted.map((el) => ({
        value: el.id,
        label: herkunftLabelFromHerkunft(el),
      })),
    [herkunftsSorted],
  )

  const artWerte = useMemo(
    () =>
      artsSorted.map((el) => ({
        value: el.id,
        label: el?.art_ae_art?.name ?? '(kein Artname)',
      })),
    [artsSorted],
  )

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
        return filter.setValue({ table: 'sammlung', key: field, value })
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
  const openGenVielfaldDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Genetische-Vielfalt`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  const openSammlungDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Sammlungen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  const nrCount = useMemo(() => {
    if (!exists(row?.nr)) return 0
    return sammlungsSorted.filter((h) => h.nr === row.nr).length
  }, [sammlungsSorted, row?.nr])
  useEffect(() => {
    if (nrCount > 1) {
      setError({
        path: 'sammlung.nr',
        value: `Diese Nummer wird ${nrCount} mal verwendet. Sie sollte aber über alle Sammlungen eindeutig sein`,
      })
    }
  }, [nrCount, setError])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToLieferungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Aus-Lieferungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToHerkuenfte = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Herkuenfte']),
    [activeNodeArray, setActiveNodeArray],
  )
  const showToHe = activeNodeArray[0] === 'Sammlungen'

  if (!row || (!showFilter && filter.show)) return null

  const firstPaneWidth = activeConflict ? '50%' : '100%'
  // hide resizer when tree is hidden
  const resizerStyle = !activeConflict ? { width: 0 } : {}

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Sammlung"
            table="sammlung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Sammlung</Title>
            <TitleSymbols>
              <IconButton title="Zur Sammlungs-Liste" onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              {showToHe && (
                <IconButton
                  title="Zu den Herkünften dieser Sammlung"
                  onClick={onClickToHerkuenfte}
                >
                  <HeDownSvg />
                </IconButton>
              )}
              <IconButton
                title="Zu den Aus-Lieferungen dieser Sammlung"
                onClick={onClickToLieferungen}
              >
                <LiDownSvg />
              </IconButton>
              <AddButton />
              <DeleteButton row={row} />
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openSammlungDocs}
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
                  error={errors?.sammlung?._deleted}
                />
              )}
              <TextField
                key={`${row.id}nr`}
                name="nr"
                label="Nr."
                value={row.nr}
                saveToDb={saveToDb}
                error={errors?.sammlung?.nr}
                type="text"
              />
              <Select
                key={`${row.id}${row.art_id}art_id`}
                name="art_id"
                value={row.art_id}
                field="art_id"
                label="Art"
                options={artWerte}
                saveToDb={saveToDb}
                error={errors?.sammlung?.art_id}
              />
              <Select
                key={`${row.id}${row.herkunft_id}herkunft_id`}
                name="herkunft_id"
                value={row.herkunft_id}
                field="herkunft_id"
                label="Herkunft"
                options={herkunftWerte}
                saveToDb={saveToDb}
                error={errors?.sammlung?.herkunft_id}
              />
              <Select
                key={`${row.id}${row.person_id}person_id`}
                name="person_id"
                value={row.person_id}
                field="person_id"
                label="Person"
                options={personWerte}
                saveToDb={saveToDb}
                error={errors?.sammlung?.person_id}
              />
              <Date
                key={`${row.id}datum`}
                name="datum"
                label="Datum"
                value={row.datum}
                saveToDb={saveToDb}
                error={errors?.sammlung?.datum}
              />
              <TextField
                key={`${row.id}anzahl_pflanzen`}
                name="anzahl_pflanzen"
                label="Anzahl Pflanzen"
                value={row.anzahl_pflanzen}
                saveToDb={saveToDb}
                error={errors?.sammlung?.anzahl_pflanzen}
                type="number"
              />
              <FieldRow>
                <TextField
                  key={`${row.id}gramm_samen`}
                  name="gramm_samen"
                  label="Gramm Samen"
                  value={row.gramm_samen}
                  saveToDb={saveToDb}
                  error={errors?.sammlung?.gramm_samen}
                  type="number"
                />
                <TextField
                  key={`${row.id}andere_menge`}
                  name="andere_menge"
                  label={`Andere Menge (z.B. "3 Zwiebeln")`}
                  value={row.andere_menge}
                  saveToDb={saveToDb}
                  error={errors?.sammlung?.andere_menge}
                  type="text"
                />
              </FieldRow>
              <FieldRow>
                <TextField
                  key={`${row.id}von_anzahl_individuen`}
                  name="von_anzahl_individuen"
                  label="von Anzahl Individuen"
                  value={row.von_anzahl_individuen}
                  saveToDb={saveToDb}
                  error={errors?.sammlung?.von_anzahl_individuen}
                  type="number"
                />
                <div>
                  <IconButton
                    aria-label="Anleitung öffnen"
                    title="Anleitung öffnen"
                    onClick={openGenVielfaldDocs}
                  >
                    <IoMdInformationCircleOutline />
                  </IconButton>
                </div>
              </FieldRow>
              {!showFilter && <Coordinates row={row} saveToDb={saveToDb} />}
              <FieldRow>
                <Checkbox2States
                  key={`${row.id}geplant`}
                  label="Geplant"
                  name="geplant"
                  value={row.geplant}
                  saveToDb={saveToDb}
                  error={errors?.sammlung?.geplant}
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
              <TextField
                key={`${row.id}bemerkungen`}
                name="bemerkungen"
                label="Bemerkungen"
                value={row.bemerkungen}
                saveToDb={saveToDb}
                error={errors?.sammlung?.bemerkungen}
                multiLine
              />
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
              {!showFilter && <Files parentId={row.id} parent="sammlung" />}
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

export default observer(Sammlung)
