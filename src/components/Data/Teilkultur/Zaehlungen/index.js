import React, { useContext, useState, useEffect, useCallback } from 'react'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../../../storeContext'
import { teilzaehlung as teilzahlungFragment } from '../../../../utils/fragments'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 10px;
  position: sticky;
  top: -10px;
  z-index: 1;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const ContentContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
`

const zaehlungQuery = gql`
  query zaehlungQueryForTkZaehlungen(
    $kulturId: bigint!
    $teilkulturId: bigint!
  ) {
    zaehlung(
      where: {
        kultur_id: { _eq: $kulturId }
        teilzaehlungs: { teilkultur_id: { _eq: $teilkulturId } }
      }
      order_by: { datum: desc_nulls_last }
    ) {
      id
      datum
      prognose
      teilzaehlungs {
        ...TeilzaehlungFields
      }
    }
  }
  ${teilzahlungFragment}
`

const TkZaehlungen = ({ kulturId, teilkulturId }) => {
  const store = useContext(storeContext)

  const { data, error, loading } = useQuery(zaehlungQuery, {
    variables: { kulturId, teilkulturId },
  })
  const rows = get(data, 'zaehlung', [])
  console.log('TkZaehlungen, rows:', rows)

  return (
    <ErrorBoundary>
      <TitleRow>
        <Title>Zählungen</Title>
      </TitleRow>
      <ContentContainer>Todo</ContentContainer>
    </ErrorBoundary>
  )
}

export default TkZaehlungen
