import React, { useContext, useCallback, useReducer } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { FixedSizeList } from 'react-window'
import ReactResizeDetector from 'react-resize-detector'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
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

const Lieferungen = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const {
    filter,
    insertLieferungRev,
    lieferungsFiltered,
    kulturIdInActiveNodeArray,
    sammelLieferungIdInActiveNodeArray,
    personIdInActiveNodeArray,
    sammlungIdInActiveNodeArray,
  } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray } = store.tree
  const isFiltered = runIsFiltered()

  const lieferungFilter = { ...store.lieferungFilter }
  if (kulturIdInActiveNodeArray) {
    if (activeNodeArray.includes('Aus-Lieferungen')) {
      lieferungFilter.von_kultur_id = {
        _eq: kulturIdInActiveNodeArray,
      }
    }
    if (activeNodeArray.includes('An-Lieferungen')) {
      lieferungFilter.nach_kultur_id = {
        _eq: kulturIdInActiveNodeArray,
      }
    }
  }
  if (sammelLieferungIdInActiveNodeArray) {
    lieferungFilter.sammel_lieferung_id = {
      _eq: sammelLieferungIdInActiveNodeArray,
    }
  }
  if (personIdInActiveNodeArray) {
    lieferungFilter.person_id = {
      _eq: personIdInActiveNodeArray,
    }
  }
  if (sammlungIdInActiveNodeArray) {
    lieferungFilter.von_sammlung_id = {
      _eq: sammlungIdInActiveNodeArray,
    }
  }

  const { error, loading } = useQuery((store) =>
    store.queryLieferung({
      where: lieferungFilter,
      order_by: { datum: 'desc_nulls_first' },
    }),
  )

  const { data: dataLieferungAggregate } = useQuery(
    (store) =>
      store.queryLieferung_aggregate(undefined, (d) =>
        d.aggregate((d) => d.count),
      ),
    (l) => l.id.datum.anzahl_pflanzen.anzahl_auspflanzbereit.geplant,
  )
  const totalNr =
    dataLieferungAggregate?.lieferung_aggregate?.aggregate?.count ?? 0

  const storeRowsFiltered = lieferungsFiltered.filter((r) => {
    if (kulturIdInActiveNodeArray) {
      if (activeNodeArray.includes('Aus-Lieferungen')) {
        return r.von_kultur_id === kulturIdInActiveNodeArray
      }
      if (activeNodeArray.includes('An-Lieferungen')) {
        return r.nach_kultur_id === kulturIdInActiveNodeArray
      }
    }
    if (sammelLieferungIdInActiveNodeArray) {
      return r.sammel_lieferung_id === sammelLieferungIdInActiveNodeArray
    }
    if (personIdInActiveNodeArray) {
      return r.person_id === personIdInActiveNodeArray
    }
    if (sammlungIdInActiveNodeArray) {
      return r.von_sammlung_id === sammlungIdInActiveNodeArray
    }
    return true
  })
  const filteredNr = storeRowsFiltered.length

  const add = useCallback(() => {
    insertLieferungRev()
  }, [insertLieferungRev])

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
        <FormTitle title="Lieferungen" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Lieferungen" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Lieferung"
            table="lieferung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Lieferungen</Title>
            <TitleSymbols>
              <IconButton
                aria-label="neue Lieferung"
                title="neue Lieferung"
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

export default observer(Lieferungen)
