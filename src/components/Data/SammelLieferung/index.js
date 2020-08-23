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
import Date from '../../shared/Date'
import Checkbox2States from '../../shared/Checkbox2States'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import exists from '../../../utils/exists'
import Lieferschein from './Lieferschein'
import getConstants from '../../../utils/constants'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import sammlungLabelFromSammlung from '../Lieferung/Lieferung/sammlungLabelFromSammlung'
import kulturLabelFromKultur from '../Lieferung/Lieferung/kulturLabelFromKultur'
import FormTitle from './FormTitle'

const constants = getConstants()

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`
const TitleRow = styled.div`
  background: rgba(248, 243, 254, 1);
  flex-shrink: 0;
  display: flex;
  height: 40px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  position: sticky;
  user-select: none;
  top: -10px;
  z-index: 1;
  &:first-of-type {
    margin-top: -10px;
  }
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
const Herkunft = styled.div`
  height: 54px;
  user-select: none;
`
const HerkunftLabel = styled.div`
  color: rgb(0, 0, 0, 0.54);
  font-size: 12px;
  padding-bottom: 2px;
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

const SammelLieferung = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
  lieferungId,
}) => {
  const store = useContext(StoreContext)

  const {
    filter,
    isPrint,
    online,
    userPersonOption,
    artsSorted,
    kultursSorted,
    personsSorted,
    sammlungsSorted,
    showDeleted,
    errors,
    unsetError,
  } = store
  const { setWidthInPercentOfScreen, activeNodeArray } = store.tree

  const row = useMemo(
    () =>
      showFilter
        ? filter.sammel_lieferung
        : store.sammel_lieferungs.get(id) || {},
    [filter.sammel_lieferung, id, showFilter, store.sammel_lieferungs],
  )

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => setActiveConflict(null), [])
  const callbackAfterUebernehmen = useCallback(
    () => setActiveConflict(null),
    [],
  )

  const { sl_show_empty_when_next_to_li } = userPersonOption

  const herkunftByNachKultur = row?.kulturByNachKulturId?.herkunft
  const herkunftByVonKultur = row?.kulturByVonKulturId?.herkunft
  const herkunftBySammlung = row?.sammlung?.herkunft
  const herkunft =
    herkunftByNachKultur ?? herkunftByVonKultur ?? herkunftBySammlung
  const herkunftQuelle = herkunftByNachKultur
    ? 'nach-Kultur'
    : herkunftByVonKultur
    ? 'von-Kultur'
    : 'Sammlung'
  const herkunftValue = herkunft
    ? `${herkunft?.nr ?? '(keine Nr)'}: ${
        herkunft?.gemeinde ?? '(keine Gemeinde)'
      }, ${herkunft.lokalname ?? '(kein Lokalname)'}`
    : ''

  useEffect(() => {
    unsetError('sammel_lieferung')
  }, [id, unsetError])

  useEffect(() => {
    if (id) setWidthInPercentOfScreen(25)
    return () => {
      if (id) setWidthInPercentOfScreen(33)
    }
  }, [id, setWidthInPercentOfScreen])

  const vonKulturWerteData = kultursSorted
    // show only kulturen of art_id
    .filter((k) => {
      if (row?.art_id) return k.art_id === row.art_id
      return true
    })
    // show only kulturen with same herkunft
    .filter((k) => {
      if (herkunft?.id) return k?.herkunft_id === herkunft.id
      return true
    })
    // shall not be delivered to same kultur it came from
    .filter((k) => {
      if (row?.nach_kultur_id && row?.von_kultur_id !== row?.nach_kultur_id) {
        return k.id !== row.nach_kultur_id
      }
      return true
    })
  const vonKulturWerte = useMemo(
    () =>
      vonKulturWerteData.map((el) => ({
        value: el?.id,
        label: kulturLabelFromKultur(el),
      })),
    [vonKulturWerteData],
  )

  const nachKulturWerteData = kultursSorted
    // show only kulturen of art_id
    .filter((k) => {
      if (row?.art_id) return k.art_id === row.art_id
      return true
    })
    // show only kulturen with same herkunft
    .filter((k) => {
      if (herkunft?.id) return k.herkunft_id === herkunft.id
      return true
    })
    // shall not be delivered to same kultur it came from
    .filter((k) => {
      if (row?.von_kultur_id && row?.von_kultur_id !== row?.nach_kultur_id) {
        return k.id !== row.von_kultur_id
      }
      return true
    })
  const nachKulturWerte = useMemo(
    () =>
      nachKulturWerteData.map((el) => ({
        value: el?.id,
        label: kulturLabelFromKultur(el),
      })),
    [nachKulturWerteData],
  )

  const sammlungWerte = useMemo(
    () =>
      sammlungsSorted
        .filter((s) => {
          if (row.art_id) return s.art_id === row.art_id
          return true
        })
        .map((el) => ({
          value: el?.id,
          label: sammlungLabelFromSammlung(el),
        })),
    [row.art_id, sammlungsSorted],
  )

  const personWerte = useMemo(
    () =>
      personsSorted.map((el) => ({
        value: el.id,
        label: `${el.fullname || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personsSorted],
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

      if (showFilter) {
        return filter.setValue({ table: 'sammel_lieferung', key: field, value })
      }

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
  const shownAsSammelLieferung =
    activeNodeArray.length === 2 && activeNodeArray[0] === 'Sammel-Lieferungen'

  // setting initial value like this is necessary
  // because during printing page Vermehrung re-renders without tree
  const [printPreview, setPrintPreview] = useState(isPrint && !printPreview)

  const openGenVielfaldDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Genetische-Vielfalt`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  const ifNeeded = useCallback(
    (field) => {
      if (sl_show_empty_when_next_to_li) return true
      if (shownAsSammelLieferung) return true
      if (
        id &&
        !sl_show_empty_when_next_to_li &&
        (!exists(row[field]) || row[field] === false)
      )
        return false
      return true
    },
    [id, row, shownAsSammelLieferung, sl_show_empty_when_next_to_li],
  )
  const ifSomeNeeded = useCallback(
    (fields) => fields.some((f) => ifNeeded(f)),
    [ifNeeded],
  )

  if (!row || (!showFilter && filter.show)) return null

  const firstPaneWidth = activeConflict ? '50%' : '100%'
  // hide resizer when tree is hidden
  const resizerStyle = !activeConflict ? { width: 0 } : {}

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          showFilter={showFilter}
          row={row}
          lieferungId={lieferungId}
          printPreview={printPreview}
          setPrintPreview={setPrintPreview}
        />
        {printPreview ? (
          <Lieferschein row={row} />
        ) : (
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
                    error={errors?.sammel_lieferung?._deleted}
                  />
                )}
                {ifSomeNeeded([
                  'art_id',
                  'anzahl_pflanzen',
                  'anzahl_auspflanzbereit',
                  'gramm_samen',
                  'andere_menge',
                  'von_anzahl_individuen',
                ]) && (
                  <>
                    <TitleRow>
                      <Title>was</Title>
                    </TitleRow>
                    {ifNeeded('art_id') && (
                      <Select
                        key={`${row.id}art_id`}
                        name="art_id"
                        value={row.art_id}
                        field="art_id"
                        label="Art"
                        options={artWerte}
                        saveToDb={saveToDb}
                        error={errors?.sammel_lieferung?.art_id}
                      />
                    )}
                    {herkunftValue && (
                      <Herkunft>
                        <HerkunftLabel>{`Herkunft (berechnet aus ${herkunftQuelle})`}</HerkunftLabel>
                        {herkunftValue}
                      </Herkunft>
                    )}
                    <FieldRow>
                      {ifNeeded('anzahl_pflanzen') && (
                        <TextField
                          key={`${row.id}anzahl_pflanzen`}
                          name="anzahl_pflanzen"
                          label="Anzahl Pflanzen"
                          value={row.anzahl_pflanzen}
                          saveToDb={saveToDb}
                          error={errors?.sammel_lieferung?.anzahl_pflanzen}
                          type="number"
                        />
                      )}
                      {ifNeeded('anzahl_auspflanzbereit') && (
                        <TextField
                          key={`${row.id}anzahl_auspflanzbereit`}
                          name="anzahl_auspflanzbereit"
                          label="Anzahl auspflanzbereit"
                          value={row.anzahl_auspflanzbereit}
                          saveToDb={saveToDb}
                          error={
                            errors?.sammel_lieferung?.anzahl_auspflanzbereit
                          }
                          type="number"
                        />
                      )}
                    </FieldRow>
                    <FieldRow>
                      {ifNeeded('gramm_samen') && (
                        <TextField
                          key={`${row.id}gramm_samen`}
                          name="gramm_samen"
                          label="Gramm Samen"
                          value={row.gramm_samen}
                          saveToDb={saveToDb}
                          error={errors?.sammel_lieferung?.gramm_samen}
                          type="number"
                        />
                      )}
                      {ifNeeded('andere_menge') && (
                        <TextField
                          key={`${row.id}andere_menge`}
                          name="andere_menge"
                          label={`Andere Menge (z.B. "3 Zwiebeln")`}
                          value={row.andere_menge}
                          saveToDb={saveToDb}
                          error={errors?.sammel_lieferung?.andere_menge}
                          type="text"
                        />
                      )}
                    </FieldRow>
                    {ifNeeded('von_anzahl_individuen') && (
                      <FieldRow>
                        <TextField
                          key={`${row.id}von_anzahl_individuen`}
                          name="von_anzahl_individuen"
                          label="von Anzahl Individuen"
                          value={row.von_anzahl_individuen}
                          saveToDb={saveToDb}
                          error={
                            errors?.sammel_lieferung?.von_anzahl_individuen
                          }
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
                    )}
                  </>
                )}
                {ifSomeNeeded(['von_sammlung_id', 'von_kultur_id']) && (
                  <>
                    <TitleRow>
                      <Title>von</Title>
                    </TitleRow>
                    {ifNeeded('von_sammlung_id') && (
                      <Select
                        key={`${row.id}${row.von_sammlung_id}von_sammlung_id`}
                        name="von_sammlung_id"
                        value={row.von_sammlung_id}
                        field="von_sammlung_id"
                        label={`Sammlung${
                          exists(row.art_id)
                            ? ' (nur solche derselben Art)'
                            : ''
                        }`}
                        options={sammlungWerte}
                        saveToDb={saveToDb}
                        error={errors?.sammel_lieferung?.von_sammlung_id}
                      />
                    )}
                    {ifNeeded('von_kultur_id') && (
                      <Select
                        key={`${row.id}${row.von_kultur_id}von_kultur_id`}
                        name="von_kultur_id"
                        value={row.von_kultur_id}
                        field="von_kultur_id"
                        label={`Kultur${
                          exists(row.art_id)
                            ? ' (nur solche derselben Art)'
                            : ''
                        }`}
                        options={vonKulturWerte}
                        saveToDb={saveToDb}
                        error={errors?.sammel_lieferung?.von_kultur_id}
                      />
                    )}
                  </>
                )}
                {ifSomeNeeded(['nach_kultur_id', 'nach_ausgepflanzt']) && (
                  <>
                    <TitleRow>
                      <Title>nach</Title>
                    </TitleRow>
                    {ifNeeded('nach_kultur_id') && (
                      <Select
                        key={`${row.id}${row.nach_kultur_id}nach_kultur_id`}
                        name="nach_kultur_id"
                        value={row.nach_kultur_id}
                        field="nach_kultur_id"
                        label={`Kultur${
                          exists(row.art_id)
                            ? ` (Kulturen derselben Art und Herkunft${
                                row.von_kultur_id ? ', ohne die von-Kultur' : ''
                              })`
                            : ''
                        }`}
                        options={nachKulturWerte}
                        saveToDb={saveToDb}
                        error={errors?.sammel_lieferung?.nach_kultur_id}
                      />
                    )}
                    {ifNeeded('nach_ausgepflanzt') && (
                      <Checkbox2States
                        key={`${row.id}nach_ausgepflanzt`}
                        label="Ausgepflanzt"
                        name="nach_ausgepflanzt"
                        value={row.nach_ausgepflanzt}
                        saveToDb={saveToDb}
                        error={errors?.sammel_lieferung?.nach_ausgepflanzt}
                      />
                    )}
                  </>
                )}
                {ifSomeNeeded(['datum', 'geplant']) && (
                  <>
                    <TitleRow>
                      <Title>wann</Title>
                    </TitleRow>
                    {ifNeeded('datum') && (
                      <Date
                        key={`${row.id}datum`}
                        name="datum"
                        label="Datum"
                        value={row.datum}
                        saveToDb={saveToDb}
                        error={errors?.sammel_lieferung?.datum}
                      />
                    )}
                    {ifNeeded('geplant') && (
                      <FieldRow>
                        <Checkbox2States
                          key={`${row.id}geplant`}
                          label="Geplant"
                          name="geplant"
                          value={row.geplant}
                          saveToDb={saveToDb}
                          error={errors?.sammel_lieferung?.geplant}
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
                  </>
                )}
                {ifSomeNeeded(['person_id', 'bemerkungen']) && (
                  <>
                    <TitleRow>
                      <Title>wer</Title>
                    </TitleRow>
                    {ifNeeded('person_id') && (
                      <Select
                        key={`${row.id}person_id`}
                        name="person_id"
                        value={row.person_id}
                        field="person_id"
                        label="Person"
                        options={personWerte}
                        saveToDb={saveToDb}
                        error={errors?.sammel_lieferung?.person_id}
                      />
                    )}
                    {ifNeeded('bemerkungen') && (
                      <TextField
                        key={`${row.id}bemerkungen`}
                        name="bemerkungen"
                        label="Bemerkungen"
                        value={row.bemerkungen}
                        saveToDb={saveToDb}
                        error={errors?.sammel_lieferung?.bemerkungen}
                        multiLine
                      />
                    )}
                  </>
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
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(SammelLieferung)
