import React, { useMemo, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../../models/reactUtils'
import Teilzaehlung from './Teilzaehlung'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import {
  teilkultur as teilkulturFragment,
  teilzaehlung as teilzaehlungFragment,
} from '../../../../utils/fragments'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const allDataQuery = gql`
  query AllDataQueryForTeilzaehlungsRows(
    $teilzaehlungFilter: teilzaehlung_bool_exp!
    $teilkulturFilter: teilkultur_bool_exp!
  ) {
    teilzaehlung(where: $teilzaehlungFilter) {
      ...TeilzaehlungFields
    }
    teilkultur(where: $teilkulturFilter) {
      ...TeilkulturFields
    }
  }
  ${teilzaehlungFragment}
  ${teilkulturFragment}
`

const TeilzaehlungenRows = ({ kulturId, zaehlungId }) => {
  const store = useContext(StoreContext)
  const { teilkultursSorted, teilzaehlungsSorted, deletedFilter } = store

  const teilzaehlungFilter = {
    zaehlung_id: { _eq: zaehlungId },
    ...deletedFilter,
  }
  const teilkulturFilter = { kultur_id: { _eq: kulturId }, ...deletedFilter }
  const { error, loading } = useQuery(allDataQuery, {
    variables: {
      teilzaehlungFilter,
      teilkulturFilter,
    },
  })
  const rows = teilzaehlungsSorted.filter((v) => v.zaehlung_id === zaehlungId)

  const teilkulturenWerte = useMemo(
    () =>
      teilkultursSorted
        .filter((t) => t.kultur_id === kulturId)
        .map((el) => ({
          value: el.id,
          label: el.name,
        })),
    [kulturId, teilkultursSorted],
  )

  if (loading && !rows.length) return null

  if (error && !error.message.includes('Failed to fetch')) {
    return (
      <Container>{`Fehler beim Laden der Daten: ${error.message}`}</Container>
    )
  }

  return (
    <ErrorBoundary>
      {rows.map((r, index) => (
        <Teilzaehlung
          key={r.id}
          index={index}
          id={r.id}
          zaehlungId={zaehlungId}
          kulturId={kulturId}
          teilzaehlung={r}
          teilkulturenWerte={teilkulturenWerte}
          teilkulturenLoading={loading}
        />
      ))}
    </ErrorBoundary>
  )
}

export default observer(TeilzaehlungenRows)
