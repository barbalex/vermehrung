import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import ErrorBoundary from 'react-error-boundary'

import { teilkultur as teilkulturFragment } from '../../../../utils/fragments'
import Teilzaehlung from './Teilzaehlung'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const teilkulturenQuery = gql`
  query TeilkulturenQuery($kulturId: bigint) {
    teilkultur(
      where: { kultur_id: { _eq: $kulturId } }
      order_by: { name: asc_nulls_first }
    ) {
      ...TeilkulturFields
    }
  }
  ${teilkulturFragment}
`

const TeilzaehlungenRows = ({ kulturId, rows, zaehlungResult }) => {
  const zaehlung = get(zaehlungResult.data, 'zaehlung', [{}])[0]
  const {
    data: teilkulturenData,
    error: teilkulturenError,
    loading: teilkulturenLoading,
    refetch: refetchTeilkulturen,
  } = useQuery(teilkulturenQuery, {
    variables: { kulturId: zaehlung.kultur_id },
  })
  const teilkulturenWerte = useMemo(() => {
    const data = get(teilkulturenData, 'teilkultur', []) || []
    return data.map(el => ({
      value: el.id,
      label: el.name,
    }))
  }, [teilkulturenData])

  if (teilkulturenError) {
    return (
      <Container>{`Fehler beim Laden der Teilkulturen: ${teilkulturenError.message}`}</Container>
    )
  }

  return (
    <ErrorBoundary>
      {rows.map((r, index) => (
        <Teilzaehlung
          key={r.id}
          index={index}
          kulturId={kulturId}
          teilzaehlung={r}
          teilkulturenWerte={teilkulturenWerte}
          teilkulturenLoading={teilkulturenLoading}
          refetchTeilkulturen={refetchTeilkulturen}
          zaehlungResult={zaehlungResult}
        />
      ))}
    </ErrorBoundary>
  )
}

export default observer(TeilzaehlungenRows)
