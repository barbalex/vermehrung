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
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { FaEnvelopeOpenText, FaEdit } from 'react-icons/fa'
import { MdPrint } from 'react-icons/md'
import SplitPane from 'react-split-pane'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import { selectFromsammel_lieferung } from '../../../models/sammel_lieferungModel.base'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Date from '../../shared/Date'
import Checkbox2States from '../../shared/Checkbox2States'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import exists from '../../../utils/exists'
import Settings from './Settings'
import Copy from './Copy'
import Lieferschein from './Lieferschein'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import appBaseUrl from '../../../utils/appBaseUrl'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import sammlungLabelFromSammlung from '../Lieferung/Lieferung/sammlungLabelFromSammlung'
import kulturLabelFromKultur from '../Lieferung/Lieferung/kulturLabelFromKultur'

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

const SL_FRAGMENT = selectFromsammel_lieferung()
  .id.art_id.person_id.von_sammlung_id.sammlung((s) =>
    s.id.datum.herkunft((h) => h.id.nr).person((p) => p.id.name),
  )
  .von_kultur_id.kulturByVonKulturId((k) =>
    k.id.garten((g) => g.id.name.person((p) => p.id.name.ort)),
  )
  .datum.nach_kultur_id.kulturByNachKulturId((k) =>
    k.id.garten((g) => g.id.name.person((p) => p.id.name.ort)),
  )
  .nach_ausgepflanzt.von_anzahl_individuen.anzahl_pflanzen.anzahl_auspflanzbereit.gramm_samen.andere_menge.geplant.bemerkungen.lieferungs(
    (l) => l.id,
  )
  .changed.changed_by._rev._parent_rev._revisions._depth._deleted._conflicts.toString()

const kulturQuery = gql`
  query kulturQueryForSammelLieferung($filter: kultur_bool_exp!) {
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
      herkunft_id
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
    setIsPrint,
    online,
    userPersonOption,
    sammelLieferungFilter,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const { setWidthInPercentOfScreen } = store.tree

  const isFiltered = runIsFiltered()
  const { error, loading, query: queryOfSammelLieferung } = useQuery((store) =>
    store.querySammel_lieferung(
      { where: { id: { _eq: id } } },
      () => SL_FRAGMENT,
    ),
  )

  const { error: artError, loading: artLoading } = useQuery((store) =>
    store.queryArt({ order_by: { art_ae_art: { name: 'asc' } } }, (a) =>
      a.id.art_ae_art((ae) => ae.id.name),
    ),
  )

  const { error: personError, loading: personLoading } = useQuery((store) =>
    store.queryPerson(
      { order_by: [{ name: 'asc_nulls_first' }, { ort: 'asc_nulls_first' }] },
      (p) => p.id.name.ort,
    ),
  )

  const [errors, setErrors] = useState({})

  const { data: dataSammelLieferungAggregate } = useQuery((store) =>
    store.querySammel_lieferung_aggregate(undefined, (d) =>
      d.aggregate((d) => d.count),
    ),
  )
  const totalNr =
    dataSammelLieferungAggregate?.sammel_lieferung_aggregate?.aggregate
      ?.count ?? 0

  const { data: dataSammelLieferungFilteredAggregate } = useQuery((store) =>
    store.querySammel_lieferung_aggregate(
      { where: sammelLieferungFilter },
      (d) => d.aggregate((d) => d.count),
    ),
  )
  const filteredNr =
    dataSammelLieferungFilteredAggregate?.sammel_lieferung_aggregate?.aggregate
      ?.count ?? 0

  const row = showFilter
    ? filter.sammel_lieferung
    : store.sammel_lieferungs.get(id) || {}

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => {
    setActiveConflict(null)
    queryOfSammelLieferung.refetch()
  }, [queryOfSammelLieferung])
  const callbackAfterUebernehmen = useCallback(() => {
    queryOfSammelLieferung.refetch()
    setActiveConflict(row?._rev ?? null)
  }, [queryOfSammelLieferung, row?._rev])

  const { sl_show_empty_when_next_to_li, sl_auto_copy_edits } = userPersonOption

  const sammlungOptions = {
    order_by: [
      { datum: 'asc_nulls_first' },
      { herkunft: { nr: 'asc_nulls_first' } },
      { person: { name: 'asc_nulls_first' } },
    ],
  }
  if (row.art_id) {
    sammlungOptions.where = { art_id: { _eq: row.art_id } }
  }
  const { error: sammlungError, loading: sammlungLoading } = useQuery((store) =>
    store.querySammlung(sammlungOptions, (s) =>
      s.id.art_id.datum.herkunft_id
        .herkunft((h) => h.id.nr.lokalname.gemeinde)
        .person((p) => p.id.name.ort),
    ),
  )

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
    ? `${herkunft.nr || '(keine Nr)'}: ${
        herkunft.gemeinde || '(keine Gemeinde)'
      }, ${herkunft.lokalname || '(kein Lokalname)'}`
    : ''

  // beware: art_id, herkunft_id and nach_kultur_id can be null
  let vonKulturFilter = { id: { _is_null: false } }
  // show only kulturen of art_id
  if (row.art_id) {
    vonKulturFilter = {
      art_id: { _eq: row.art_id },
    }
  }
  // show only kulturen with same herkunft
  if (row.art_id && herkunft && herkunft.id) {
    vonKulturFilter = {
      art_id: { _eq: row.art_id },
      herkunft_id: { _eq: herkunft.id },
    }
  }
  // can't be delivered to same kultur it came from
  if (row.art_id && herkunft && herkunft.id && row.nach_kultur_id) {
    vonKulturFilter = {
      art_id: { _eq: row.art_id },
      herkunft_id: { _eq: herkunft.id },
      id: { _neq: row.nach_kultur_id },
    }
  }
  const {
    data: vonKulturData,
    error: vonKulturError,
    loading: vonKulturLoading,
  } = useQuery(kulturQuery, {
    variables: { filter: vonKulturFilter },
  })
  // only kulturen of same herkunft!
  // beware: art_id, herkunft_id and von_kultur_id can be null
  let nachKulturFilter = { id: { _is_null: false } }
  // show only kulturen of art_id
  if (row.art_id) {
    nachKulturFilter = {
      art_id: { _eq: row.art_id },
    }
  }
  // show only kulturen with same herkunft
  if (row.art_id && herkunft && herkunft.id) {
    nachKulturFilter = {
      art_id: { _eq: row.art_id },
      herkunft_id: { _eq: herkunft.id },
    }
  }
  // can't be delivered to same kultur it came from
  if (row.art_id && herkunft && herkunft.id && row.von_kultur_id) {
    nachKulturFilter = {
      art_id: { _eq: row.art_id },
      herkunft_id: { _eq: herkunft.id },
      id: { _neq: row.von_kultur_id },
    }
  }
  const {
    data: nachKulturData,
    error: nachKulturError,
    loading: nachKulturLoading,
  } = useQuery(kulturQuery, {
    variables: { filter: nachKulturFilter },
  })

  useEffect(() => {
    setErrors({})
  }, [id])
  useEffect(() => {
    if (id) setWidthInPercentOfScreen(25)
    return () => {
      if (id) setWidthInPercentOfScreen(33)
    }
  }, [id, setWidthInPercentOfScreen])

  const vonKulturWerte = useMemo(
    () =>
      (vonKulturData?.kultur ?? []).map((el) => ({
        value: el?.id,
        label: kulturLabelFromKultur(el),
      })),
    [vonKulturData?.kultur],
  )
  const nachKulturWerte = useMemo(
    () =>
      [nachKulturData, 'kultur', []].map((el) => ({
        value: el?.id,
        label: kulturLabelFromKultur(el),
      })),
    [nachKulturData],
  )

  const sammlungWerte = useMemo(
    () =>
      [...store.sammlungs.values()]
        .filter((s) => {
          if (row.art_id) return s.art_id === row.art_id
          return true
        })
        .map((el) => ({
          value: el?.id,
          label: sammlungLabelFromSammlung(el),
        })),
    [row.art_id, store.sammlungs],
  )

  const personWerte = useMemo(
    () =>
      [...store.persons.values()].map((el) => ({
        value: el.id,
        label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [store.persons],
  )

  const artWerte = useMemo(
    () =>
      [...store.arts.values()].map((el) => ({
        value: el.id,
        label: el?.art_ae_art?.name ?? '(kein Artname)',
      })),
    [store.arts],
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
        return filter.setValue({ table: 'sammel_lieferung', key: field, value })
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
  const openSettingsDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Sammel-Lieferungen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  // setting initial value like this is necessary
  // because during printing page Vermehrung re-renders without tree
  const [printPreview, setPrintPreview] = useState(isPrint && !printPreview)
  const showLieferschein = useCallback(() => {
    setPrintPreview(!printPreview)
  }, [printPreview])
  const printLieferschein = useCallback(() => {
    setIsPrint(true)
    setTimeout(() => {
      window.print()
      setIsPrint(false)
    })
  }, [setIsPrint])

  const openGenVielfaldDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Genetische-Vielfalt`
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
      if (
        id &&
        !sl_show_empty_when_next_to_li &&
        (!exists(row[field]) || row[field] === false)
      )
        return false
      return true
    },
    [id, row, sl_show_empty_when_next_to_li],
  )
  const ifSomeNeeded = useCallback(
    (fields) => fields.some((f) => ifNeeded(f)),
    [ifNeeded],
  )

  if (loading) {
    return (
      <Container>
        <FormTitle title="Sammel-Lieferung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow =
    error ||
    sammlungError ||
    vonKulturError ||
    nachKulturError ||
    artError ||
    personError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Sammel-Lieferung" />
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
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Sammel-Lieferung"
            table="sammel_lieferung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Sammel-Lieferung</Title>
            <TitleSymbols>
              {!sl_auto_copy_edits && (
                <Copy sammelLieferung={row} lieferungId={lieferungId} />
              )}
              <AddButton />
              <DeleteButton row={row} />
              <IconButton
                aria-label={printPreview ? 'Formular' : 'Lieferschein'}
                title={printPreview ? 'Formular' : 'Lieferschein'}
                onClick={showLieferschein}
              >
                {printPreview ? <FaEdit /> : <FaEnvelopeOpenText />}
              </IconButton>
              {printPreview && (
                <IconButton
                  aria-label="drucken"
                  title="drucken"
                  onClick={printLieferschein}
                >
                  <MdPrint />
                </IconButton>
              )}
              {id && <Settings />}
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openSettingsDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
              {(store.filter.show || isFiltered) && (
                <TitleFilterNumbers>{`${filteredNr}/${totalNr}`}</TitleFilterNumbers>
              )}
            </TitleSymbols>
          </TitleContainer>
        )}
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
                        loading={artLoading}
                        saveToDb={saveToDb}
                        error={errors.art_id}
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
                          error={errors.anzahl_pflanzen}
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
                          error={errors.anzahl_auspflanzbereit}
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
                          error={errors.gramm_samen}
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
                          error={errors.andere_menge}
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
                          error={errors.von_anzahl_individuen}
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
                        loading={sammlungLoading}
                        saveToDb={saveToDb}
                        error={errors.von_sammlung_id}
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
                        loading={vonKulturLoading}
                        saveToDb={saveToDb}
                        error={errors.von_kultur_id}
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
                        loading={nachKulturLoading}
                        saveToDb={saveToDb}
                        error={errors.nach_kultur_id}
                      />
                    )}
                    {ifNeeded('nach_ausgepflanzt') && (
                      <Checkbox2States
                        key={`${row.id}nach_ausgepflanzt`}
                        label="Ausgepflanzt"
                        name="nach_ausgepflanzt"
                        value={row.nach_ausgepflanzt}
                        saveToDb={saveToDb}
                        error={errors.nach_ausgepflanzt}
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
                        error={errors.datum}
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
                        loading={personLoading}
                        saveToDb={saveToDb}
                        error={errors.person_id}
                      />
                    )}
                    {ifNeeded('bemerkungen') && (
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
