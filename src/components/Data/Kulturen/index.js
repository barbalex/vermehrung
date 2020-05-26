import React, { useContext, useCallback, useReducer } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
//import gql from 'graphql-tag'
import { FixedSizeList } from 'react-window'
import ReactResizeDetector from 'react-resize-detector'
import { v1 as uuidv1 } from 'uuid'
import md5 from 'blueimp-md5'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import queryFromTable from '../../../utils/queryFromTable'
//import {
//  art as artFragment,
//  garten as gartenFragment,
//  kultur as kulturFragment,
//  person as personFragment,
//} from '../../../utils/fragments'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'

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
  overflow: auto !important;
  height: 100%;
`

const singleRowHeight = 48
function sizeReducer(state, action) {
  return action.payload
}

const Kulturen = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const { filter, upsertKulturModel, addQueuedQuery, user } = store
  const { isFiltered: runIsFiltered } = filter
  const {
    activeNodeArray,
    setActiveNodeArray,
    addOpenNodes,
    refetch: refetchTree,
  } = store.tree
  const isFiltered = runIsFiltered()

  const kulturFilter = queryFromTable({ store, table: 'kultur' })
  if (activeNodeArray.includes('Gaerten')) {
    kulturFilter.garten_id = {
      _eq: activeNodeArray[activeNodeArray.indexOf('Gaerten') + 1],
    }
  }
  if (activeNodeArray.includes('Arten')) {
    kulturFilter.art_id = {
      _eq: activeNodeArray[activeNodeArray.indexOf('Arten') + 1],
    }
  }
  const {
    data: dataFiltered,
    error: errorFiltered,
    loading: loadingFiltered,
  } = useQuery((store) =>
    store.queryKultur(
      {
        where: kulturFilter,
        order_by: [
          { garten: { person: { name: 'asc_nulls_first' } } },
          { art: { art_ae_art: { name: 'asc_nulls_first' } } },
        ],
      },
      (d) =>
        d.id.art_id
          .art((a) => a.id.art_ae_art((ae) => ae.id.name))
          .herkunft_id.herkunft((h) => h.id.nr)
          .garten_id.garten((g) => g.id.name.person((p) => p.id.name)),
    ),
  )

  const { data: dataKulturAggregate } = useQuery((store) =>
    store.queryKultur_aggregate(undefined, (d) => d.aggregate((d) => d.count)),
  )
  const totalNr = dataKulturAggregate?.kultur_aggregate?.aggregate?.count ?? 0

  const rowsFiltered = dataFiltered?.kultur ?? []
  const filteredNr = rowsFiltered.length

  const add = useCallback(() => {
    const id = uuidv1()
    const _rev = `1-${md5(JSON.stringify({ id, _deleted: false }))}`
    const _depth = 1
    const _revisions = `{"${_rev}"}`
    const newObject = {
      id: uuidv1(),
      kultur_id: id,
      _rev,
      _depth,
      _revisions,
      changed: new window.Date().toISOString(),
      changed_by: user.email,
    }
    addQueuedQuery({
      name: 'mutateInsert_kultur_rev_one',
      variables: JSON.stringify({
        object: newObject,
        on_conflict: {
          constraint: 'kultur_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryKultur',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: id } },
      }),
    })
    // optimistically update store
    upsertKulturModel(newObject)
    setTimeout(() => {
      // will be unnecessary once tree is converted to mst
      refetchTree()
      // update tree status
      const newActiveNodeArray = [...activeNodeArray, id]
      setActiveNodeArray(newActiveNodeArray)
      addOpenNodes([newActiveNodeArray])
    })
  }, [
    user.email,
    addQueuedQuery,
    upsertKulturModel,
    refetchTree,
    activeNodeArray,
    setActiveNodeArray,
    addOpenNodes,
  ])

  const [sizeState, sizeDispatch] = useReducer(sizeReducer, {
    width: 0,
    height: 0,
  })
  const onResize = useCallback(
    (width, height) => sizeDispatch({ payload: { width, height } }),
    [],
  )

  if (loadingFiltered) {
    return (
      <Container>
        <FormTitle title="Kulturen" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = errorFiltered
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Kulturen" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
      </Container>
    )
  }

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
            <Title>Kulturen</Title>
            <TitleSymbols>
              <IconButton
                aria-label="neue Kultur"
                title="neue Kultur"
                onClick={add}
              >
                <FaPlus />
              </IconButton>
              {(store.filter.show || isFiltered) && (
                <TitleFilterNumbers>{`${filteredNr}/${totalNr}`}</TitleFilterNumbers>
              )}
            </TitleSymbols>
          </TitleContainer>
        )}
        <FieldsContainer>
          <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
          <FixedSizeList
            height={sizeState.height}
            itemCount={rowsFiltered.length}
            itemSize={singleRowHeight}
            width={sizeState.width}
          >
            {({ index, style }) => (
              <Row
                key={index}
                style={style}
                index={index}
                row={rowsFiltered[index]}
                last={index === rowsFiltered.length - 1}
              />
            )}
          </FixedSizeList>
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Kulturen)
