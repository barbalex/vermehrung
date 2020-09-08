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
import SelectLoadingOptions from '../../shared/SelectLoadingOptions'
import Checkbox2States from '../../shared/Checkbox2States'
import Checkbox3States from '../../shared/Checkbox3States'
import FilterTitle from '../../shared/FilterTitle'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import Timeline from './Timeline'
import HerkunftTimeline from './HerkunftTimeline'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import QK from './QK'
import Personen from './Personen'
import UpSvg from '../../../svg/to_up.inline.svg'
import SaDownSvg from '../../../svg/to_sa_down.inline.svg'
import KuDownSvg from '../../../svg/to_ku_down.inline.svg'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import FilterNumbers from '../../shared/FilterNumbers'

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

const Art = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const {
    artsFiltered,
    artsSorted,
    filter,
    online,
    tree,
    aeArtsSorted,
    errors,
    unsetError,
  } = store
  const { activeNodeArray, setActiveNodeArray } = tree

  const totalNr = artsSorted.length
  const filteredNr = artsFiltered.length

  const row = useMemo(
    () => (showFilter ? filter.art : store.arts.get(id) || {}),
    [filter.art, id, showFilter, store.arts],
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

  useEffect(() => {
    unsetError('art')
  }, [id, unsetError])

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'art', key: field, value })
      }

      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToSammlungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Sammlungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToKulturen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Kulturen']),
    [activeNodeArray, setActiveNodeArray],
  )

  const aeArtIdsNotToShow = artsSorted
    .map((a) => a.ae_id)
    .filter((ae_id) => ae_id !== row.ae_id)

  const aeArtsFilter = (val) => {
    if (showFilter) {
      return aeArtsSorted
        .filter((a) => artsSorted.map((ar) => ar.ae_id).includes(a.id))
        .filter((a) => a.name.toLowerCase().includes(val))
    }
    if (val) {
      return aeArtsSorted
        .filter((a) => !aeArtIdsNotToShow.includes(a.id))
        .filter((a) => a.name.toLowerCase().includes(val))
    }
    return aeArtsSorted.filter((a) => !aeArtIdsNotToShow.includes(a.id))
  }

  const showDeleted = showFilter || row._deleted

  if (!row || (!showFilter && filter.show)) return null

  const firstPaneWidth = activeConflict ? '50%' : '100%'
  // hide resizer when tree is hidden
  const resizerStyle = !activeConflict ? { width: 0 } : {}

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Art"
            table="art"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Art</Title>
            <TitleSymbols>
              <IconButton title="Zur Liste" onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              <IconButton
                title="Zu den Sammlungen dieser Art"
                onClick={onClickToSammlungen}
              >
                <SaDownSvg />
              </IconButton>
              <IconButton
                title="Zu den Kulturen dieser Art"
                onClick={onClickToKulturen}
              >
                <KuDownSvg />
              </IconButton>
              <AddButton />
              <DeleteButton row={row} />
              <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
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
                <>
                  {showFilter ? (
                    <Checkbox3States
                      key={`${row.id}_deleted`}
                      label="gelöscht"
                      name="_deleted"
                      value={row._deleted}
                      saveToDb={saveToDb}
                      error={errors?.art?._deleted}
                    />
                  ) : (
                    <Checkbox2States
                      key={`${row.id}_deleted`}
                      label="gelöscht"
                      name="_deleted"
                      value={row._deleted}
                      saveToDb={saveToDb}
                      error={errors?.art?._deleted}
                    />
                  )}
                </>
              )}
              <SelectLoadingOptions
                key={`${row.id}ae_id`}
                field="ae_id"
                valueLabelPath="art_ae_art.name"
                valueLabel="name"
                label="Art"
                row={row}
                saveToDb={saveToDb}
                error={errors?.art?.ae_id}
                modelKey="name"
                modelFilter={aeArtsFilter}
                showFilterModel={aeArtsSorted}
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
              {!showFilter && (
                <>
                  <Personen artId={id} />
                  <Timeline artId={id} />
                  <HerkunftTimeline artId={id} />
                  <QK artId={id} />
                  <Files parentId={id} parent="art" />
                </>
              )}
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
    </ErrorBoundary>
  )
}

export default observer(Art)
