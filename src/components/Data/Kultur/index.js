import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import uniq from 'lodash/uniq'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { FaDownload } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
// see: https://github.com/guyonroche/exceljs/issues/313
import * as ExcelJs from 'exceljs/dist/exceljs.min.js'
import SplitPane from 'react-split-pane'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Checkbox2States from '../../shared/Checkbox2States'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import Settings from './Settings'
import kulturQuery from './kulturQuery'
import Timeline from './Timeline'
import QK from './QK'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import buildExceljsWorksheets from './buildExceljsWorksheets'
import downloadExceljsWorkbook from '../../../utils/downloadExceljsWorkbook'
import appBaseUrl from '../../../utils/appBaseUrl'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import herkunftLabelFromHerkunft from './herkunftLabelFromHerkunft'
import gartenLabelFromGarten from './gartenLabelFromGarten'

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

const Kultur = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const {
    filter,
    online,
    gartenIdInActiveNodeArray,
    artIdInActiveNodeArray,
  } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()
  const hierarchyFilter = {}
  if (gartenIdInActiveNodeArray) {
    hierarchyFilter.garten_id = {
      _eq: gartenIdInActiveNodeArray,
    }
  }
  if (artIdInActiveNodeArray) {
    hierarchyFilter.art_id = {
      _eq: artIdInActiveNodeArray,
    }
  }
  const kulturFilter = { ...store.kulturFilter, ...hierarchyFilter }
  const kulturResult = useQuery(kulturQuery, {
    variables: { id, isFiltered, filter: kulturFilter },
  })
  const { error, loading } = kulturResult

  const [errors, setErrors] = useState({})

  const aggregateVariables = Object.keys(hierarchyFilter).length
    ? { where: hierarchyFilter }
    : undefined
  const { data: dataKulturAggregate } = useQuery((store) =>
    store.queryKultur_aggregate(aggregateVariables, (d) =>
      d.aggregate((d) => d.count),
    ),
  )
  const totalNr = dataKulturAggregate?.kultur_aggregate?.aggregate?.count ?? 0

  const { data: dataKulturFilteredAggregate } = useQuery((store) =>
    store.queryKultur_aggregate({ where: kulturFilter }, (d) =>
      d.aggregate((d) => d.count),
    ),
  )
  const filteredNr =
    dataKulturFilteredAggregate?.kultur_aggregate?.aggregate?.count ?? 0

  const row = showFilter ? filter.kultur : store.kulturs.get(id) ?? {}

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => setActiveConflict(null), [])
  const callbackAfterUebernehmen = useCallback(
    () => setActiveConflict(null),
    [],
  )

  useEffect(() => {
    setErrors({})
  }, [id])

  // From all collected combinations of art and herkunft show only arten of those not present in this garten
  // => find all combinations of art and herkunft in sammlungen
  // => substract the ones existing in this garden
  // => present arten of the rest
  const { data: sammlungData, error: sammlungError } = useQuery((store) =>
    store.querySammlung(
      {
        where: {
          art_id: { _is_null: false },
          herkunft_id: { _is_null: false },
        },
      },
      (s) => s.id.art_id.herkunft_id,
    ),
  )
  const artHerkunftInGarten = (row?.garten?.kulturs ?? [])
    // only consider kulturen with both art and herkunft chosen
    .filter((o) => o.art_id && o.herkunft_id)
  const sammlungs = sammlungData?.sammlung ?? []
  const artHerkunftToChoose = sammlungs.filter(
    (s) =>
      !artHerkunftInGarten.find(
        (a) => a.art_id === s.art_id && a.herkunft_id === s.herkunft_id,
      ),
  )
  const artenToChoose = uniq(
    artHerkunftToChoose
      .filter((ah) =>
        row.herkunft_id ? ah.herkunft_id === row.herkunft_id : true,
      )
      .map((a) => a.art_id),
  )
  // do show own art
  if (row.art_id && !artenToChoose.includes(row.art_id)) {
    artenToChoose.push(row.art_id)
  }
  const herkunftToChoose = uniq(
    artHerkunftToChoose
      .filter((ah) => (row.art_id ? ah.art_id === row.art_id : true))
      .map((a) => a.herkunft_id),
  )
  // do show own herkunft
  if (row.herkunft_id && !herkunftToChoose.includes(row.herkunft_id)) {
    herkunftToChoose.push(row.herkunft_id)
  }

  const artFilter = { ae_id: { _is_null: false } }
  if (artenToChoose.length) {
    artFilter.id = { _in: artenToChoose }
  }
  const { data: dataArt, error: errorArt, loading: loadingArt } = useQuery(
    (store) =>
      store.queryArt(
        {
          where: artFilter,
          order_by: { art_ae_art: { name: 'asc_nulls_first' } },
        },
        (a) => a.id.art_ae_art((ae) => ae.id.name),
      ),
  )

  const herkunftFilter = { id: { _in: herkunftToChoose } }
  const {
    data: herkunftData,
    error: herkunftError,
    loading: herkunftLoading,
  } = useQuery((store) =>
    store.queryHerkunft(
      {
        where: herkunftFilter,
        order_by: [
          { nr: 'asc_nulls_first' },
          { gemeinde: 'asc_nulls_first' },
          { lokalname: 'asc_nulls_first' },
        ],
      },
      (h) => h.id.nr.lokalname.gemeinde,
    ),
  )

  const {
    data: dataGarten,
    error: errorGarten,
    loading: loadingGarten,
  } = useQuery((store) =>
    store.queryGarten(
      { order_by: { person: { name: 'asc_nulls_first' } } },
      (g) => g.id.name.person((p) => p.id.name),
    ),
  )

  const artWerte = useMemo(
    () =>
      (dataArt?.art ?? []).map((el) => ({
        value: el.id,
        label: el?.art_ae_art?.name ?? '(keine Art)',
      })),
    [dataArt?.art],
  )

  const gartenWerte = useMemo(
    () =>
      (dataGarten?.garten ?? []).map((el) => ({
        value: el.id,
        label: gartenLabelFromGarten(el),
      })),
    [dataGarten?.garten],
  )

  const herkunftWerte = useMemo(
    () =>
      (herkunftData?.herkunft ?? []).map((el) => ({
        value: el.id,
        label: herkunftLabelFromHerkunft(el),
      })),
    [herkunftData?.herkunft],
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
        return filter.setValue({ table: 'kultur', key: field, value })
      }
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )
  const openKulturDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Kulturen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  const openGenVielfaldDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Genetische-Vielfalt`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  const onClickDownload = useCallback(async () => {
    const workbook = new ExcelJs.Workbook()
    await buildExceljsWorksheets({ store, kultur_id: row.id, workbook })
    downloadExceljsWorkbook({ store, fileName: `Kultur_${row.id}`, workbook })
  }, [row.id, store])

  if (loading) {
    return (
      <Container>
        <FormTitle title="Kultur" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow =
    error || errorArt || errorGarten || herkunftError || sammlungError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Kultur" />
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
            title="Kultur"
            table="kultur"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Kultur</Title>
            <TitleSymbols>
              <AddButton />
              <DeleteButton row={row} />
              <IconButton
                aria-label="Daten herunterladen"
                title="Daten herunterladen"
                onClick={onClickDownload}
              >
                <FaDownload />
              </IconButton>
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openKulturDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
              <Settings kulturId={id} />
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
                key={`${row.id}${row.art_id}art_id`}
                name="art_id"
                value={row.art_id}
                field="art_id"
                label="Art"
                options={artWerte}
                loading={loadingArt}
                saveToDb={saveToDb}
                error={errors.art_id}
              />
              <Select
                key={`${row.id}${row.herkunft_id}herkunft_id`}
                name="herkunft_id"
                value={row.herkunft_id}
                field="herkunft_id"
                label="Herkunft"
                options={herkunftWerte}
                loading={herkunftLoading}
                saveToDb={saveToDb}
                error={errors.herkunft_id}
              />
              <Select
                key={`${row.id}${row.garten_id}garten_id`}
                name="garten_id"
                value={row.garten_id}
                field="garten_id"
                label="Garten"
                options={gartenWerte}
                loading={loadingGarten}
                saveToDb={saveToDb}
                error={errors.garten_id}
              />
              <Checkbox2States
                key={`${row.id}zwischenlager`}
                label="Zwischenlager"
                name="zwischenlager"
                value={row.zwischenlager}
                saveToDb={saveToDb}
                error={errors.zwischenlager}
              />
              <Checkbox2States
                key={`${row.id}erhaltungskultur`}
                label="Erhaltungskultur"
                name="erhaltungskultur"
                value={row.erhaltungskultur}
                saveToDb={saveToDb}
                error={errors.erhaltungskultur}
              />
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
              <Checkbox2States
                key={`${row.id}aktiv`}
                label="aktiv"
                name="aktiv"
                value={row.aktiv}
                saveToDb={saveToDb}
                error={errors.aktiv}
              />
              <TextField
                key={`${row.id}bemerkungen`}
                name="bemerkungen"
                label="Bemerkungen"
                value={row.bemerkungen}
                saveToDb={saveToDb}
                error={errors.bemerkungen}
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
              {!showFilter && row.id && (
                <>
                  <Timeline row={row} />
                  <QK kultur={row} />
                  <Files parentId={row.id} parent="kultur" />
                </>
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

export default observer(Kultur)
