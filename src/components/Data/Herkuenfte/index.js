import React, { useContext, useCallback, useReducer } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import get from 'lodash/get'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import ReactResizeDetector from 'react-resize-detector'
import { v1 as uuidv1 } from 'uuid'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import queryFromTable from '../../../utils/queryFromTable'
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

const Herkuenfte = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const { filter, mutateInsert_herkunft } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()
  const {
    activeNodeArray: anaRaw,
    setActiveNodeArray,
    addOpenNodes,
    refetch: refetchTree,
  } = store.tree
  const activeNodeArray = anaRaw.toJSON()

  const herkunftFilter = queryFromTable({ store, table: 'herkunft' })
  if (activeNodeArray.includes('Sammlungen')) {
    herkunftFilter.sammlungs = {
      id: { _eq: activeNodeArray[activeNodeArray.indexOf('Sammlungen') + 1] },
    }
  }
  const {
    data: dataFiltered,
    error: errorFiltered,
    loading: loadingFiltered,
    query: queryFiltered,
  } = useQuery((store) =>
    store.queryHerkunft(
      {
        where: herkunftFilter,
        order_by: [{ nr: 'asc' }, { gemeinde: 'asc' }, { lokalname: 'asc' }],
      },
      (d) => d.id.gemeinde.lokalname.nr,
    ),
  )
  const { data: dataAll } = useQuery((store) =>
    store.queryHerkunft(undefined, (d) => d.id),
  )

  const totalNr = get(dataAll, 'herkunft', []).length
  const rowsFiltered = get(dataFiltered, 'herkunft', [])
  const filteredNr = rowsFiltered.length

  const add = useCallback(async () => {
    const id = uuidv1()
    const newObject = { id }
    await mutateInsert_herkunft(
      {
        objects: [newObject],
        on_conflict: { constraint: 'herkunft_pkey', update_columns: [] },
      },
      undefined,
      () => {
        self.herkunfts = { newObject, ...store.herkunfts.toJS() }
      },
    )
    queryFiltered.refetch()
    refetchTree()
    const newActiveNodeArray = [...activeNodeArray, id]
    setActiveNodeArray(newActiveNodeArray)
    // add node.url just in case it was not yet open
    addOpenNodes([newActiveNodeArray, newActiveNodeArray])
  }, [
    mutateInsert_herkunft,
    queryFiltered,
    refetchTree,
    activeNodeArray,
    setActiveNodeArray,
    addOpenNodes,
    store.herkunfts,
  ])

  const [sizeState, sizeDispatch] = useReducer(sizeReducer, {
    width: 0,
    height: 0,
  })
  const onResize = useCallback(
    (width, height) => sizeDispatch({ payload: { width, height } }),
    [],
  )
  // herkuenfte is top node
  // never enable adding below that
  const showPlus = activeNodeArray.length < 2

  if (loadingFiltered) {
    return (
      <Container>
        <FormTitle title="Herkünfte" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = errorFiltered
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Herkünfte" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Herkunft"
            table="herkunft"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Herkünfte</Title>
            <TitleSymbols>
              {showPlus && (
                <IconButton
                  aria-label="neue Herkunft"
                  title="neue Herkunft"
                  onClick={add}
                >
                  <FaPlus />
                </IconButton>
              )}
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

export default observer(Herkuenfte)
