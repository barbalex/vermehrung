import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../../storeContext'
import SelectLoadingOptions from '../../shared/SelectLoadingOptions'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import { art as artFragment } from '../../../utils/fragments'
import Files from '../Files'
import artQuery from './artQuery'
import aeArtQuery from './aeArtQuery'
import Timeline from './Timeline'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#fff3e0' : 'unset')};
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
    row = get(data, 'art', [{}])[0]
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
          <FormTitle
            title="Art"
            table="art"
            rowsLength={totalNr}
            rowsFilteredLength={filteredNr}
            filter={showFilter}
          />
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
            filter={val =>
              val
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
            }
            resultNodesName="ae_art"
            resultNodesLabelName="name"
          />
          {!showFilter && (
            <>
              <Timeline row={row} />
              <Files parentId={row.id} parent="art" />
            </>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Art)
