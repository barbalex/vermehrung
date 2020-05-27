import React, { useMemo, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { teilkultur as teilkulturFragment } from '../../../../utils/fragments'
import { useQuery, StoreContext } from '../../../../models/reactUtils'
import Teilzaehlung from './Teilzaehlung'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const teilkulturenQuery = gql`
  query TeilkulturenQuery($kulturId: uuid) {
    teilkultur(
      where: { kultur_id: { _eq: $kulturId } }
      order_by: { name: asc_nulls_first }
    ) {
      ...TeilkulturFields
    }
  }
  ${teilkulturFragment}
`

const TeilzaehlungenRows = ({ kulturId, rows, zaehlungId }) => {
  const store = useContext(StoreContext)
  const zaehlung = store.zaehlungs.get(zaehlungId)

  const {
    data: teilkulturenData,
    error: teilkulturenError,
    loading: teilkulturenLoading,
    refetch: refetchTeilkulturen,
  } = useQuery(teilkulturenQuery, {
    variables: { kulturId: zaehlung.kultur_id },
  })
  const teilkulturenWerte = useMemo(
    () =>
      (teilkulturenData?.teilkultur ?? []).map((el) => ({
        value: el.id,
        label: el.name,
      })),
    [teilkulturenData?.teilkultur],
  )

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
          if={r.id}
          index={index}
          kulturId={kulturId}
          teilzaehlung={r}
          teilkulturenWerte={teilkulturenWerte}
          teilkulturenLoading={teilkulturenLoading}
          refetchTeilkulturen={refetchTeilkulturen}
        />
      ))}
    </ErrorBoundary>
  )
}

export default observer(TeilzaehlungenRows)
