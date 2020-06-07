import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Checkbox2States from '../../shared/Checkbox2States'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import Coordinates from '../../shared/Coordinates'
import Settings from './Settings'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Download from './Download'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import { garten as gartenFragment } from '../../../utils/fragments'

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
  query AllDataQueryForGarten(
    $id: uuid!
    $gartenFilter: garten_bool_exp!
    $totalCountFilter: garten_bool_exp!
  ) {
    garten(where: { id: { _eq: $id } }) {
      ...GartenFields
    }
    garten_total_count: garten_aggregate(where: $totalCountFilter) {
      aggregate {
        count
      }
    }
    garten_filtered_count: garten_aggregate(where: $gartenFilter) {
      aggregate {
        count
      }
    }
    person {
      id
      __typename
      name
      ort
    }
  }
  ${gartenFragment}
`

const Garten = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)

  const {
    filter,
    online,
    userPersonOption,
    personIdInActiveNodeArray,
    personsSorted,
    hideInactive,
    showDeleted,
  } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()
  const hierarchyFilter = {}
  if (personIdInActiveNodeArray) {
    hierarchyFilter.person_id = {
      _eq: personIdInActiveNodeArray,
    }
  }
  const gartenFilter = { ...store.gartenFilter, ...hierarchyFilter }

  const totalCountFilter = { ...hierarchyFilter }
  if (!showDeleted) {
    totalCountFilter._deleted = { _eq: false }
  }
  if (hideInactive) {
    totalCountFilter.aktiv = { _eq: true }
  }
  const { data, error, loading } = useQuery(allDataQuery, {
    variables: {
      id,
      gartenFilter,
      totalCountFilter,
    },
  })

  const [errors, setErrors] = useState({})

  const totalNr = data?.garten_total_count?.aggregate?.count
  const filteredNr = data?.garten_filtered_count?.aggregate?.count

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
    setErrors({})
  }, [id])

  const personWerte = useMemo(
    () =>
      personsSorted.map((el) => ({
        value: el.id,
        label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personsSorted],
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
        return filter.setValue({ table: 'garten', key: field, value })
      }
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )

  if (loading) {
    return (
      <Container>
        <FormTitle title="Garten" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Garten" />
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
              <AddButton />
              <DeleteButton row={row} />
              <Download gartenId={row.id} />
              <Settings />
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
              <TextField
                key={`${row.id}name`}
                name="name"
                label="Name"
                value={row.name}
                saveToDb={saveToDb}
                error={errors.name}
              />
              <Select
                key={`${row.id}${row.person_id}person_id`}
                name="person_id"
                value={row.person_id}
                field="person_id"
                label="Person"
                options={personWerte}
                loading={loading}
                saveToDb={saveToDb}
                error={errors.person_id}
              />
              {ga_strasse && (
                <TextField
                  key={`${row.id}strasse`}
                  name="strasse"
                  label="Strasse"
                  value={row.strasse}
                  saveToDb={saveToDb}
                  error={errors.strasse}
                />
              )}
              {ga_plz && (
                <TextField
                  key={`${row.id}plz`}
                  name="plz"
                  label="PLZ"
                  value={row.plz}
                  saveToDb={saveToDb}
                  error={errors.plz}
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
                  error={errors.ort}
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
                  error={errors.aktiv}
                />
              )}
              {ga_bemerkungen && (
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
