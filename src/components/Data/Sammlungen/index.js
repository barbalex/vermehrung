import React, { useContext, useCallback, useReducer } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import ReactResizeDetector from 'react-resize-detector'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import Row from './Row'
import ErrorBoundary from '../../shared/ErrorBoundary'
import { garten as gartenFragment } from '../../../utils/fragments'

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

const Sammlungen = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const {
    filter,
    insertSammlungRev,
    sammlungsFiltered,
    artIdInActiveNodeArray,
    herkunftIdInActiveNodeArray,
    personIdInActiveNodeArray,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()

  const hierarchyFilter = {}
  if (artIdInActiveNodeArray) {
    hierarchyFilter.art_id = {
      _eq: artIdInActiveNodeArray,
    }
  }
  if (herkunftIdInActiveNodeArray) {
    hierarchyFilter.herkunft_id = {
      _eq: herkunftIdInActiveNodeArray,
    }
  }
  if (personIdInActiveNodeArray) {
    hierarchyFilter.person_id = {
      _eq: personIdInActiveNodeArray,
    }
  }
  const sammlungFilter = { ...store.sammlungFilter, ...hierarchyFilter }

  const aggregateVariables = Object.keys(hierarchyFilter).length
    ? { where: hierarchyFilter }
    : undefined
  const { data: dataSammlungAggregate } = useQuery((store) =>
    store.querySammlung_aggregate(aggregateVariables, (d) =>
      d.aggregate((d) => d.count),
    ),
  )
  const totalNr =
    dataSammlungAggregate?.sammlung_aggregate?.aggregate?.count ?? 0

  const { error, loading } = useQuery(
    (store) =>
      store.querySammlung({
        where: sammlungFilter,
        order_by: [{ nr: 'asc_nulls_first' }, { datum: 'desc_nulls_first' }],
      }),
    (s) =>
      s.id.nr.geplant
        .art((a) => a.id.art_ae_art((ae) => ae.id.name))
        .person((p) => p.id.name)
        .herkunft((h) => h.id.nr),
  )

  const storeRowsFiltered = sammlungsFiltered.filter((r) => {
    if (artIdInActiveNodeArray) {
      return r.art_id === artIdInActiveNodeArray
    }
    if (herkunftIdInActiveNodeArray) {
      return r.herkunft_id === herkunftIdInActiveNodeArray
    }
    if (personIdInActiveNodeArray) {
      return r.person_id === personIdInActiveNodeArray
    }
    return true
  })
  const filteredNr = storeRowsFiltered.length

  const add = useCallback(() => {
    insertSammlungRev()
  }, [insertSammlungRev])

  const [sizeState, sizeDispatch] = useReducer(sizeReducer, {
    width: 0,
    height: 0,
  })
  const onResize = useCallback(
    (width, height) => sizeDispatch({ payload: { width, height } }),
    [],
  )

  if (loading) {
    return (
      <Container>
        <FormTitle title="Sammlungen" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Sammlungen" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Sammlung"
            table="sammlung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Sammlungen</Title>
            <TitleSymbols>
              <IconButton
                aria-label="neue Sammlung"
                title="neue Sammlung"
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
            itemCount={storeRowsFiltered.length}
            itemSize={singleRowHeight}
            width={sizeState.width}
          >
            {({ index, style }) => (
              <Row
                key={index}
                style={style}
                index={index}
                row={storeRowsFiltered[index]}
                last={index === storeRowsFiltered.length - 1}
              />
            )}
          </FixedSizeList>
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Sammlungen)
