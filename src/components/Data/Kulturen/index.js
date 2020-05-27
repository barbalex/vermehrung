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
import queryFromTable from '../../../utils/queryFromTable'
import queryFromStore from '../../../utils/queryFromStore'
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
  const { filter, insertKulturRev } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray } = store.tree
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
  const { error: errorFiltered, loading: loadingFiltered } = useQuery((store) =>
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

  const storeRowsFiltered = queryFromStore({ store, table: 'kultur' })
  const filteredNr = storeRowsFiltered.length

  const add = useCallback(() => {
    insertKulturRev()
  }, [insertKulturRev])

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

export default observer(Kulturen)
