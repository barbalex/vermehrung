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
import SplitPane from 'react-split-pane'

import { StoreContext } from '../../../models/reactUtils'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Checkbox2States from '../../shared/Checkbox2States'
import FilterTitle from '../../shared/FilterTitle'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import Coordinates from '../../shared/Coordinates'
import Settings from './Settings'
import Personen from './Personen'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Download from './Download'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import FilterNumbers from '../../shared/FilterNumbers'
import UpSvg from '../../../svg/to_up.inline.svg'
import KuDownSvg from '../../../svg/to_ku_down.inline.svg'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`
const TitleContainer = styled.div`
  background-color:rgba(74, 20, 140, 0.1);
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
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
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

const Garten = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)

  const {
    filter,
    online,
    gartensSorted,
    gartensFiltered,
    userPersonOption,
    personIdInActiveNodeArray,
    personsSorted,
    showDeleted,
    errors,
    unsetError,
    insertGvRev,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const isFiltered = runIsFiltered()
  const hierarchyFilter = (e) => {
    if (personIdInActiveNodeArray)
      return e.person_id === personIdInActiveNodeArray
    return true
  }

  const totalNr = gartensSorted.filter(hierarchyFilter).length
  const filteredNr = gartensFiltered.filter(hierarchyFilter).length

  const row = showFilter ? filter.garten : store.gartens.get(id) || {}

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => setActiveConflict(null), [])
  const callbackAfterUebernehmen = useCallback(
    () => setActiveConflict(null),
    [],
  )

  const {
    ga_strasse,
    ga_plz,
    ga_ort,
    ga_geom_point,
    ga_aktiv,
    ga_bemerkungen,
  } = userPersonOption

  useEffect(() => {
    unsetError('garten')
  }, [id, unsetError])

  const personWerte = useMemo(
    () =>
      personsSorted.map((el) => ({
        value: el.id,
        label: `${el.fullname || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personsSorted],
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
        return filter.setValue({ table: 'garten', key: field, value })
      }
      row.edit({ field, value })
      if (field === 'person_id') {
        insertGvRev({ values: { garten_id: row.id, person_id: value } })
      }
    },
    [filter, insertGvRev, row, showFilter],
  )

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToKulturen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Kulturen']),
    [activeNodeArray, setActiveNodeArray],
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
            title="Garten"
            table="garten"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Garten</Title>
            <TitleSymbols>
              <IconButton title="Zur Liste" onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton title="Zu den Kulturen" onClick={onClickToKulturen}>
                <KuDownSvg />
              </IconButton>
              <AddButton />
              <DeleteButton row={row} />
              <Download gartenId={row.id} />
              <Settings />
              {(store.filter.show || isFiltered) && (
                <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
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
                  error={errors?.garten?._deleted}
                />
              )}
              <TextField
                key={`${row.id}name`}
                name="name"
                label="Name"
                value={row.name}
                saveToDb={saveToDb}
                error={errors?.garten?.name}
              />
              <Select
                key={`${row.id}${row.person_id}person_id`}
                name="person_id"
                value={row.person_id}
                field="person_id"
                label="Person"
                options={personWerte}
                saveToDb={saveToDb}
                error={errors?.garten?.person_id}
              />
              {ga_strasse && (
                <TextField
                  key={`${row.id}strasse`}
                  name="strasse"
                  label="Strasse"
                  value={row.strasse}
                  saveToDb={saveToDb}
                  error={errors?.garten?.strasse}
                />
              )}
              {ga_plz && (
                <TextField
                  key={`${row.id}plz`}
                  name="plz"
                  label="PLZ"
                  value={row.plz}
                  saveToDb={saveToDb}
                  error={errors?.garten?.plz}
                  type="number"
                />
              )}
              {ga_ort && (
                <TextField
                  key={`${row.id}ort`}
                  name="ort"
                  label="Ort"
                  value={row.ort}
                  saveToDb={saveToDb}
                  error={errors?.garten?.ort}
                />
              )}
              {!showFilter && ga_geom_point && (
                <Coordinates row={row} saveToDb={saveToDb} />
              )}
              {ga_aktiv && (
                <Checkbox2States
                  key={`${row.id}aktiv`}
                  label="aktiv"
                  name="aktiv"
                  value={row.aktiv}
                  saveToDb={saveToDb}
                  error={errors?.garten?.aktiv}
                />
              )}
              {ga_bemerkungen && (
                <TextField
                  key={`${row.id}bemerkungen`}
                  name="bemerkungen"
                  label="Bemerkungen"
                  value={row.bemerkungen}
                  saveToDb={saveToDb}
                  error={errors?.garten?.bemerkungen}
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
              <Personen gartenId={row.id} />
              {!showFilter && <Files parentId={row.id} parent="garten" />}
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

export default observer(Garten)
