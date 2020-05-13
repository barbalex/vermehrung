import React, { useContext, useCallback, useReducer } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import get from 'lodash/get'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import gql from 'graphql-tag'
import { FixedSizeList } from 'react-window'
import ReactResizeDetector from 'react-resize-detector'
import { v1 as uuidv1 } from 'uuid'
import md5 from 'blueimp-md5'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import queryFromTable from '../../../utils/queryFromTable'
import {
  lieferung as lieferungFragment,
  zaehlung as zaehlungFragment,
} from '../../../utils/fragments'
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

const query = gql`
  query LieferungQueryForLieferungs($filter: lieferung_bool_exp!) {
    rowsUnfiltered: lieferung {
      id
    }
    rowsFiltered: lieferung(
      where: $filter
      order_by: { datum: desc_nulls_first }
    ) {
      ...LieferungFields
      kulturByNachKulturId {
        id
        zaehlungs {
          ...ZaehlungFields
          teilzaehlungs_aggregate {
            aggregate {
              sum {
                anzahl_pflanzen
                anzahl_auspflanzbereit
                anzahl_mutterpflanzen
              }
            }
          }
        }
      }
    }
  }
  ${lieferungFragment}
  ${zaehlungFragment}
`

const singleRowHeight = 48
function sizeReducer(state, action) {
  return action.payload
}

const Lieferungen = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const { filter, addLieferung, addQueuedQuery } = store
  const { isFiltered: runIsFiltered } = filter
  const {
    activeNodeArray,
    setActiveNodeArray,
    addOpenNodes,
    refetch: refetchTree,
  } = store.tree
  const isFiltered = runIsFiltered()

  const lieferungFilter = queryFromTable({ store, table: 'lieferung' })
  if (activeNodeArray.includes('Kulturen')) {
    if (activeNodeArray.includes('Aus-Lieferungen')) {
      lieferungFilter.von_kultur_id = {
        _eq: activeNodeArray[activeNodeArray.indexOf('Kulturen') + 1],
      }
    }
    if (activeNodeArray.includes('An-Lieferungen')) {
      lieferungFilter.nach_kultur_id = {
        _eq: activeNodeArray[activeNodeArray.indexOf('Kulturen') + 1],
      }
    }
  }
  if (activeNodeArray.includes('Sammel-Lieferungen')) {
    lieferungFilter.sammel_lieferung_id = {
      _eq: activeNodeArray[activeNodeArray.indexOf('Sammel-Lieferungen') + 1],
    }
  }
  if (activeNodeArray.includes('Personen')) {
    lieferungFilter.person_id = {
      _eq: activeNodeArray[activeNodeArray.indexOf('Personen') + 1],
    }
  }
  if (activeNodeArray.includes('Sammlungen')) {
    lieferungFilter.von_sammlung_id = {
      _eq: activeNodeArray[activeNodeArray.indexOf('Sammlungen') + 1],
    }
  }
  const { data, error, loading } = useQuery(query, {
    variables: { filter: lieferungFilter },
  })

  const totalNr = get(data, 'rowsUnfiltered', []).length
  const rows = get(data, 'rowsFiltered', [])
  const filteredNr = rows.length

  const add = useCallback(() => {
    const id = uuidv1()
    const _rev = `1-${md5({ id, _deleted: false }.toString())}`
    const _depth = 1
    const _revisions = `{"${_rev}"}`
    const newObject = { id, _rev, _depth, _revisions }
    addQueuedQuery({
      name: 'mutateInsert_lieferung_rev',
      variables: JSON.stringify({
        objects: [newObject],
        on_conflict: {
          constraint: 'lieferung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'queryLieferung',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: id } },
      }),
    })
    // optimistically update store
    addLieferung(newObject)
    setTimeout(() => {
      // will be unnecessary once tree is converted to mst
      refetchTree()
      // update tree status
      const newActiveNodeArray = [...activeNodeArray, id]
      setActiveNodeArray(newActiveNodeArray)
      addOpenNodes([newActiveNodeArray])
    })
  }, [
    activeNodeArray,
    addLieferung,
    addOpenNodes,
    addQueuedQuery,
    refetchTree,
    setActiveNodeArray,
  ])

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
            itemCount={rows.length}
            itemSize={singleRowHeight}
            width={sizeState.width}
          >
            {({ index, style }) => (
              <Row
                key={index}
                style={style}
                index={index}
                row={rows[index]}
                last={index === rows.length - 1}
              />
            )}
          </FixedSizeList>
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Lieferungen)
