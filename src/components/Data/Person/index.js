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
import { StoreContext } from '../../../models/reactUtils'
import TextField from '../../shared/TextField'
import Select from '../../shared/Select'
import FilterTitle from '../../shared/FilterTitle'
import Checkbox2States from '../../shared/Checkbox2States'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import Arten from './Arten'
import Gaerten from './Gaerten'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import KontoMenu from './KontoMenu'
import exists from '../../../utils/exists'

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

const Person = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)

  const {
    filter,
    online,
    personsSorted,
    personsFiltered,
    userPerson,
    userRolesSorted,
    errors,
    unsetError,
    setError,
  } = store
  const { isFiltered: runIsFiltered } = filter

  const isFiltered = runIsFiltered()

  const hierarchyFilter = () => {
    return true
  }

  const userRoleWerte = useMemo(
    () =>
      userRolesSorted.map((el) => ({
        value: el.name,
        label: el.label,
      })),
    [userRolesSorted],
  )

  const totalNr = personsSorted.filter(hierarchyFilter).length
  const filteredNr = personsFiltered.filter(hierarchyFilter).length

  const row = showFilter ? filter.person : store.persons.get(id) ?? {}

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => setActiveConflict(null), [])
  const callbackAfterUebernehmen = useCallback(
    () => setActiveConflict(null),
    [],
  )

  useEffect(() => {
    unsetError('person')
  }, [id, unsetError])

  const { user_role } = userPerson

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
        return filter.setValue({ table: 'person', key: field, value })
      }
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )

  const nrCount = useMemo(() => {
    if (!exists(row?.nr)) return 0
    return personsSorted.filter((h) => h.nr === row.nr).length
  }, [personsSorted, row?.nr])
  useEffect(() => {
    if (nrCount > 1) {
      setError({
        path: 'person.nr',
        value: `Diese Nummer wird ${nrCount} mal verwendet. Sie sollte aber über alle Personen eindeutig sein`,
      })
    }
  }, [nrCount, setError])

  if (!row || (!showFilter && filter.show)) return null

  const firstPaneWidth = activeConflict ? '50%' : '100%'
  // hide resizer when tree is hidden
  const resizerStyle = !activeConflict ? { width: 0 } : {}

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Person"
            table="person"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Person</Title>
            <TitleSymbols>
              <KontoMenu row={row} />
              {user_role === 'manager' && (
                <>
                  <AddButton />
                  <DeleteButton row={row} />
                </>
              )}
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
                key={`${row.id}${row.user_role}user_role`}
                name="user_role"
                value={row.user_role}
                field="user_role"
                label="Rolle"
                helperText={row?.userRoleByUserRole?.comment}
                options={userRoleWerte}
                saveToDb={saveToDb}
                error={errors?.person?.user_role}
              />
              <TextField
                key={`${row.id}nr`}
                name="nr"
                label="Nr"
                value={row.nr}
                saveToDb={saveToDb}
                error={errors?.person?.nr}
              />
              <TextField
                key={`${row.id}vorname`}
                name="vorname"
                label="Vorname"
                value={row.vorname}
                saveToDb={saveToDb}
                error={errors?.person?.vorname}
              />
              <TextField
                key={`${row.id}name`}
                name="name"
                label="Nachname"
                value={row.name}
                saveToDb={saveToDb}
                error={errors?.person?.name}
              />
              <TextField
                key={`${row.id}adresszusatz`}
                name="adresszusatz"
                label="Adress-Zusatz"
                value={row.adresszusatz}
                saveToDb={saveToDb}
                error={errors?.person?.adresszusatz}
              />
              <TextField
                key={`${row.id}strasse`}
                name="strasse"
                label="Strasse"
                value={row.strasse}
                saveToDb={saveToDb}
                error={errors?.person?.strasse}
              />
              <TextField
                key={`${row.id}plz`}
                name="plz"
                label="PLZ"
                value={row.plz}
                saveToDb={saveToDb}
                error={errors?.person?.plz}
                type="number"
              />
              <TextField
                key={`${row.id}ort`}
                name="ort"
                label="Ort"
                value={row.ort}
                saveToDb={saveToDb}
                error={errors?.person?.ort}
              />
              <TextField
                key={`${row.id}telefon_privat`}
                name="telefon_privat"
                label="Telefon privat"
                value={row.telefon_privat}
                saveToDb={saveToDb}
                error={errors?.person?.telefon_privat}
              />
              <TextField
                key={`${row.id}telefon_geschaeft`}
                name="telefon_geschaeft"
                label="Telefon Geschäft"
                value={row.telefon_geschaeft}
                saveToDb={saveToDb}
                error={errors?.person?.telefon_geschaeft}
              />
              <TextField
                key={`${row.id}telefon_mobile`}
                name="telefon_mobile"
                label="Telefon mobile"
                value={row.telefon_mobile}
                saveToDb={saveToDb}
                error={errors?.person?.telefon_mobile}
              />
              <TextField
                key={`${row.id}email`}
                name="email"
                label="Email"
                value={row.email}
                saveToDb={saveToDb}
                error={errors?.person?.email}
              />
              <Checkbox2States
                key={`${row.id}kein_email`}
                label="Kein Email"
                name="kein_email"
                value={row.kein_email}
                saveToDb={saveToDb}
                error={errors?.person?.kein_email}
              />
              <Checkbox2States
                key={`${row.id}kommerziell`}
                label="Kommerziell"
                name="kommerziell"
                value={row.kommerziell}
                saveToDb={saveToDb}
                error={errors?.person?.kommerziell}
              />
              <Checkbox2States
                key={`${row.id}info`}
                label="Info"
                name="info"
                value={row.info}
                saveToDb={saveToDb}
                error={errors?.person?.info}
              />
              <Checkbox2States
                key={`${row.id}aktiv`}
                label="aktiv"
                name="aktiv"
                value={row.aktiv}
                saveToDb={saveToDb}
                error={errors?.person?.aktiv}
              />
              <TextField
                key={`${row.id}bemerkungen`}
                name="bemerkungen"
                label="Bemerkungen"
                value={row.bemerkungen}
                saveToDb={saveToDb}
                error={errors?.person?.bemerkungen}
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
              {row.user_role === 'artverantwortlich' && (
                <Arten personId={row.id} />
              )}
              {['gaertner', 'artverantwortlich'].includes(row.user_role) && (
                <Gaerten personId={row.id} />
              )}
              {!showFilter && row.id && (
                <Files parentId={row.id} parent="person" />
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

export default observer(Person)
