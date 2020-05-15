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
  sammlung as sammlungFragment,
  art as artFragment,
  person as personFragment,
  herkunft as herkunftFragment,
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
  query SammlungQueryForSammlungs($filter: sammlung_bool_exp!) {
    rowsUnfiltered: sammlung {
      id
      __typename
    }
    rowsFiltered: sammlung(
      where: $filter
      order_by: [{ nr: asc_nulls_first }, { datum: desc_nulls_first }]
    ) {
      ...SammlungFields
      art {
        ...ArtFields
      }
      herkunft {
        ...HerkunftFields
      }
      person {
        ...PersonFields
      }
    }
  }
  ${artFragment}
  ${herkunftFragment}
  ${personFragment}
  ${sammlungFragment}
`

const singleRowHeight = 48
function sizeReducer(state, action) {
  return action.payload
}

const Sammlungen = ({ filter: showFilter }) => {
  const store = useContext(StoreContext)
  const { filter, upsertSammlung, addQueuedQuery, user } = store
  const { isFiltered: runIsFiltered } = filter
  const {
    activeNodeArray,
    setActiveNodeArray,
    addOpenNodes,
    refetch: refetchTree,
  } = store.tree
  const isFiltered = runIsFiltered()

  const sammlungFilter = queryFromTable({ store, table: 'sammlung' })
  if (activeNodeArray.includes('Arten')) {
    sammlungFilter.art_id = {
      _eq: activeNodeArray[activeNodeArray.indexOf('Arten') + 1],
    }
  }
  if (activeNodeArray.includes('Herkuenfte')) {
    sammlungFilter.herkunft_id = {
      _eq: activeNodeArray[activeNodeArray.indexOf('Herkuenfte') + 1],
    }
  }
  if (activeNodeArray.includes('Personen')) {
    sammlungFilter.person_id = {
      _eq: activeNodeArray[activeNodeArray.indexOf('Personen') + 1],
    }
  }
  const { data, error, loading } = useQuery(query, {
    variables: { filter: sammlungFilter },
  })

  const totalNr = get(data, 'rowsUnfiltered', []).length
  const rows = get(data, 'rowsFiltered', [])
  const filteredNr = rows.length

  const add = useCallback(() => {
    const id = uuidv1()
    const _rev = `1-${md5({ id, _deleted: false }.toString())}`
    const _depth = 1
    const _revisions = `{"${_rev}"}`
    const newObject = {
      id,
      _rev,
      _depth,
      _revisions,
      changed: new Date().toISOString(),
      changed_by: user.email,
    }
    addQueuedQuery({
      name: 'mutateInsert_sammlung_rev',
      variables: JSON.stringify({
        objects: [newObject],
        on_conflict: {
          constraint: 'sammlung_rev_pkey',
          update_columns: ['id'],
        },
      }),
      callbackQuery: 'querySammlung',
      callbackQueryVariables: JSON.stringify({
        where: { id: { _eq: id } },
      }),
    })
    // optimistically update store
    upsertSammlung(newObject)
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
    upsertSammlung,
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

export default observer(Sammlungen)
