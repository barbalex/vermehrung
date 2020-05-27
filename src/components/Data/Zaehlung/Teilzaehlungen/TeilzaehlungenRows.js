import React, { useMemo, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { useQuery, StoreContext } from '../../../../models/reactUtils'
import Teilzaehlung from './Teilzaehlung'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const TeilzaehlungenRows = ({ kulturId, zaehlungId }) => {
  const store = useContext(StoreContext)
  const { loading, error } = useQuery((store) =>
    store.queryTeilzaehlung({
      where: { zaehlung_id: { _eq: zaehlungId } },
    }),
  )
  const rows = [...store.teilzaehlungs.values()].filter(
    (v) => v.zaehlung_id === zaehlungId,
  )

  const {
    error: teilkulturenError,
    loading: teilkulturenLoading,
    refetch: refetchTeilkulturen,
  } = useQuery((store) =>
    store.queryTeilkultur({
      where: { kultur_id: { _eq: kulturId } },
      order_by: { name: 'asc_nulls_first' },
    }),
  )
  const teilkulturenWerte = useMemo(
    () =>
      [...store.teilkulturs.values()]
        .filter((t) => t.kultur_id === kulturId)
        .map((el) => ({
          value: el.id,
          label: el.name,
        })),
    [kulturId, store.teilkulturs],
  )

  if (loading) return null

  if (error) {
    return (
      <Container>{`Fehler beim Laden der Teilzaehlungen: ${teilkulturenError.message}`}</Container>
    )
  }

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
        />
      ))}
    </ErrorBoundary>
  )
}

export default observer(TeilzaehlungenRows)
