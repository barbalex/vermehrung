import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import SplitPane from 'react-split-pane'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import toPgArray from '../../../utils/toPgArray'
import SelectLoadingOptions from '../../shared/SelectLoadingOptions'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import queryFromTable from '../../../utils/queryFromTable'
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

const Art = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { filter, tree, addQueuedQuery, upsertArt, user, online } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()
  const { activeNodeArray, setActiveNodeArray } = tree

  const artFilter = queryFromTable({ store, table: 'art' })
  const { data: dataArtAggregate } = useQuery((store) =>
    store.queryArt_aggregate(undefined, (d) => d.aggregate((d) => d.count)),
  )

  const { error: errorArt, loading: loadingArt, query: queryOfArt } = useQuery(
    (store) => store.queryArt({ where: { id: { _eq: id } } }),
    (a) =>
      a.id.ae_id.art_ae_art((ae) => ae.id.name).changed.changed_by._rev._depth
        ._conflicts,
  )

  const [errors, setErrors] = useState({})

  const totalNr = dataArtAggregate?.art_aggregate?.aggregate?.count ?? 0

  const { data: dataArtFilteredAggregate } = useQuery((store) =>
    store.queryArt_aggregate({ where: artFilter }, (d) =>
      d.aggregate((d) => d.count),
    ),
  )
  const filteredNr =
    dataArtFilteredAggregate?.art_aggregate?.aggregate?.count ?? 0

  const row = showFilter ? filter.art : store.arts.get(id)

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => {
    setActiveConflict(null)
    queryOfArt.refetch()
  }, [queryOfArt])
  const callbackAfterUebernehmen = useCallback(() => {
    queryOfArt.refetch()
    setActiveConflict(row?._rev ?? null)
  }, [queryOfArt, row?._rev])

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
      // first build the part that will be revisioned
      const depth = row._depth + 1
      const newObject = {
        art_id: row.id,
        ae_id: value,
        changed_by: user.email,
        _parent_rev: row._rev,
        _depth: depth,
      }
      const rev = `${depth}-${md5(JSON.stringify(newObject))}`
      // DO NOT include id in rev - or revs with same data will conflict
      newObject.id = uuidv1()
      newObject._rev = rev
      newObject.changed = new window.Date().toISOString()
      const newObjectForStore = { ...newObject }
      // convert to string as hasura does not support arrays yet
      // https://github.com/hasura/graphql-engine/pull/2243
      newObject._revisions = row._revisions
        ? toPgArray([rev, ...row._revisions])
        : toPgArray([rev])
      // do not stringify revisions for store
      // as _that_ is a real array
      newObjectForStore._revisions = row._revisions
        ? [rev, ...row._revisions]
        : [rev]
      addQueuedQuery({
        name: 'mutateInsert_art_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'art_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryArt',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: id } },
        }),
      })
      // optimistically update store
      upsertArt(newObjectForStore)
      setTimeout(() => {
        if (['ae_id'].includes(field)) store.tree.refetch()
      }, 50)
    },
    [
      row,
      showFilter,
      user.email,
      addQueuedQuery,
      id,
      filter,
      upsertArt,
      store.tree,
    ],
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

  if (loadingArt) {
    return (
      <Container>
        <FormTitle title="Art" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = errorArt
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Art" />
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
