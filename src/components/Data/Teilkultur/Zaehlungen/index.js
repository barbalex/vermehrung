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
  margin-left: -10px;
  margin-right: -10px;
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
      TODO
    </ErrorBoundary>
  )
}

export default TkZaehlungen
