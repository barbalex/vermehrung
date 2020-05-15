import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import get from 'lodash/get'
import IconButton from '@material-ui/core/IconButton'
import md5 from 'blueimp-md5'
import moment from 'moment'

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

const Art = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { filter, tree, addQueuedQuery, upsertArt, user } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()
  const { activeNodeArray, setActiveNodeArray } = tree

  const artFilter = queryFromTable({ store, table: 'art' })
  const { data: dataArtAggregate } = useQuery((store) =>
    store.queryArt_aggregate(undefined, (d) => d.aggregate((d) => d.count)),
  )
  const {
    data: dataFiltered,
    error: errorFiltered,
    loading: loadingFiltered,
    query,
  } = useQuery((store) =>
    store.queryArt({
      where: artFilter,
    }),
  )

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(dataArtAggregate, 'art_aggregate.aggregate.count', 0)
  const filteredNr = get(dataFiltered, 'art', []).length
  if (showFilter) {
    row = filter.art
  } else {
    row = store.arts.get(id)
  }

  useEffect(() => {
    setErrors({})
  }, [row.id])

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
        id: row.id,
        ae_id: value,
        changed: new Date().toISOString(),
        changed_by: user.email,
        _parent_rev: row._rev,
        _depth: depth,
      }
      const rev = `${depth}-${md5(newObject.toString())}`
      newObject._rev = rev
      // convert to string as hasura does not support arrays yet
      // https://github.com/hasura/graphql-engine/pull/2243
      newObject._revisions = row._revisions
        ? toPgArray([rev, ...row._revisions])
        : toPgArray([rev])
      addQueuedQuery({
        name: 'mutateInsert_art_rev',
        variables: JSON.stringify({
          objects: [newObject],
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
      setTimeout(() => {
        // optimistically update store
        upsertArt(newObject)
        // refetch query because is not a model instance
        query.refetch()
      }, 50)
    },
    [addQueuedQuery, upsertArt, filter, id, row, showFilter, user, query],
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

  if (loadingFiltered) {
    return (
      <Container>
        <FormTitle title="Art" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = errorFiltered
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Art" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  //console.log('Art', { row })

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
        <FieldsContainer>
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
          {!showFilter && (
            <>
              <Timeline artId={row.id} />
              <Herkunft artId={row.id} />
              <QK artId={row.id} />
              <Files parentId={row.id} parent="art" />
            </>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Art)
