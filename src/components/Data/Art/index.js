import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import SplitPane from 'react-split-pane'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import SelectLoadingOptions from '../../shared/SelectLoadingOptions'
import Checkbox2States from '../../shared/Checkbox2States'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import Timeline from './Timeline'
import Herkunft from './Herkunft'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import QK from './QK'
import ArUpSvg from '../../../svg/to_ar_up.inline.svg'
import SaSvg from '../../../svg/to_sa.inline.svg'
import KuSvg from '../../../svg/to_ku.inline.svg'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import ConflictList from '../../shared/ConflictList'
import { art as artFragment } from '../../../utils/fragments'

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
  query AllDataQueryForArt(
    $id: uuid!
    $artFilter: art_bool_exp!
    $totalCountFilter: art_bool_exp!
  ) {
    art(where: { id: { _eq: $id } }) {
      ...ArtFields
    }
    art_total_count: art_aggregate(where: $totalCountFilter) {
      aggregate {
        count
      }
    }
    art_filtered_count: art_aggregate(where: $artFilter) {
      aggregate {
        count
      }
    }
  }
  ${artFragment}
`

const Art = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { filter, tree, online, artFilter, showDeleted } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()
  const { activeNodeArray, setActiveNodeArray } = tree

  const hierarchyFilter = {}
  const totalCountFilter = { ...hierarchyFilter }
  if (!showDeleted) {
    totalCountFilter._deleted = { _eq: false }
  }
  const { data, error, loading } = useQuery(allDataQuery, {
    variables: {
      id,
      artFilter,
      totalCountFilter,
    },
  })

  const [errors, setErrors] = useState({})

  const totalNr = data?.art_total_count?.aggregate?.count
  const filteredNr = data?.art_filtered_count?.aggregate?.count

  const row = showFilter ? filter.art : store.arts.get(id) || {}

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => setActiveConflict(null), [])
  const callbackAfterUebernehmen = useCallback(
    () => setActiveConflict(null),
    [],
  )

  useEffect(() => {
    setErrors({})
  }, [id])

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
        return filter.setValue({ table: 'art', key: field, value })
      }
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )

  const artSelectFilter = useCallback(
    (val) => {
      if (showFilter) {
        return {
          ae_art_art: { id: { _is_null: false } },
          name: { _ilike: `%${val}%` },
        }
      }
      return val
        ? {
            _or: [
              { _not: { ae_art_art: { id: { _is_null: false } } } },
              { ae_art_art: { id: { _eq: id } } },
            ],
            name: { _ilike: `%${val}%` },
          }
        : {
            _or: [
              { _not: { ae_art_art: { id: { _is_null: false } } } },
              { ae_art_art: { id: { _eq: id } } },
            ],
          }
    },
    [id, showFilter],
  )
  const onClickToArten = useCallback(
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

  if (loading && !Object.keys(row).length) {
    return (
      <Container>
        <FormTitle title="Art" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Art" />
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
            title="Art"
            table="art"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Art</Title>
            <TitleSymbols>
              <IconButton title="Zu allen Arten" onClick={onClickToArten}>
                <ArUpSvg />
              </IconButton>
              <IconButton
                title="Zu den Sammlungen dieser Art"
                onClick={onClickToSammlungen}
              >
                <SaSvg />
              </IconButton>
              <IconButton
                title="Zu den Kulturen dieser Art"
                onClick={onClickToKulturen}
              >
                <KuSvg />
              </IconButton>
              <AddButton />
              <DeleteButton row={row} />
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
                  error={errors._deleted}
                />
              )}
              <SelectLoadingOptions
                key={`${row.id}ae_id2`}
                field="ae_id"
                valueLabelPath="art_ae_art.name"
                label="Art"
                row={row}
                saveToDb={saveToDb}
                error={errors.ae_id}
                queryName={'queryAe_art'}
                where={artSelectFilter}
                order_by={{ name: 'asc_nulls_first' }}
                resultNodesName="ae_art"
                resultNodesLabelName="name"
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
                  <Timeline artId={row.id} />
                  <Herkunft artId={row.id} />
                  <QK artId={row.id} />
                  <Files parentId={row.id} parent="art" />
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

export default observer(Art)
