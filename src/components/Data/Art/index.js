import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import ErrorBoundary from 'react-error-boundary'
import IconButton from '@material-ui/core/IconButton'

import storeContext from '../../../storeContext'
import SelectLoadingOptions from '../../shared/SelectLoadingOptions'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import {
  art as artFragment,
  aeArt as aeArtFragment,
} from '../../../utils/fragments'
import Files from '../Files'
import artQuery from './artQuery'
import Timeline from './Timeline'
import Herkunft from './Herkunft'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import QK from './QK'
import ArUpSvg from '../../../svg/to_ar_up.inline.svg'
import SaSvg from '../../../svg/to_sa.inline.svg'
import KuSvg from '../../../svg/to_ku.inline.svg'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#fff3e0' : 'unset')};
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
  padding-right: 8px;
  cursor: default;
  user-select: none;
  padding-right: 5px;
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

const Art = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter, tree } = store
  const { isFiltered: runIsFiltered } = filter
  const isFiltered = runIsFiltered()
  const { activeNodeArray, refetch } = tree

  const artId = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))
  const artFilter = queryFromTable({ store, table: 'art' })
  const { data, error, loading } = useQuery(artQuery, {
    variables: { id: artId, filter: artFilter, isFiltered },
  })

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.art
  } else {
    row = get(data, 'art[0]') || {}
  }

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      if (showFilter) {
        filter.setValue({ table: 'art', key: field, value })
      } else {
        try {
          await client.mutate({
            mutation: gql`
              mutation update_art($id: bigint!, $ae_id: uuid) {
                update_art(
                  where: { id: { _eq: $id } }
                  _set: { ae_id: $ae_id }
                ) {
                  affected_rows
                  returning {
                    ...ArtFields
                  }
                }
              }
              ${artFragment}
            `,
            variables: {
              id: row.id,
              ae_id: value,
            },
          })
        } catch (error) {
          return setErrors({ [field]: error.message })
        }
        setErrors({})
        refetch()
      }
    },
    [client, filter, refetch, row, showFilter],
  )
  const artSelectFilter = useCallback(
    val => {
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
              { ae_art_art: { id: { _eq: artId } } },
            ],
            name: { _ilike: `%${val}%` },
          }
        : {
            _or: [
              { _not: { ae_art_art: { id: { _is_null: false } } } },
              { ae_art_art: { id: { _eq: artId } } },
            ],
          }
    },
    [artId, showFilter],
  )
  // maybe: sort dependent on person_felder.ar_name_deutsch
  const aeArtQuery = gql`
    query aeArtQuery($filter: ae_art_bool_exp!) {
      ae_art(where: $filter, order_by: { name: asc_nulls_first }, limit: 7) {
        ...AeArtFields
      }
    }
    ${aeArtFragment}
  `

  if (loading) {
    return (
      <Container>
        <FormTitle title="Art" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error
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
              <IconButton>
                <ArUpSvg />
              </IconButton>
              <IconButton>
                <SaSvg />
              </IconButton>
              <IconButton>
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
            query={aeArtQuery}
            filter={artSelectFilter}
            resultNodesName="ae_art"
            resultNodesLabelName="name"
          />
          {!showFilter && (
            <>
              <Timeline artId={row.id} />
              <Herkunft artId={row.id} />
              <QK art={row} />
              <Files parentId={row.id} parent="art" />
            </>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Art)
