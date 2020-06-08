import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { FaPlus } from 'react-icons/fa'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../../models/reactUtils'
import TeilzaehlungenRows from './TeilzaehlungenRows'
import Settings from './Settings'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import { teilzaehlung as teilzaehlungFragment } from '../../../../utils/fragments'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
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

const allDataQuery = gql`
  query AllDataQueryForTeilzaehlungs(
    $teilzaehlungFilter: teilzaehlung_bool_exp!
    $totalCountFilter: teilzaehlung_bool_exp!
  ) {
    teilzaehlung(where: $teilzaehlungFilter) {
      ...TeilzaehlungFields
      zaehlung {
        id
        __typename
        kultur {
          id
          __typename
          kultur_option {
            id
            __typename
            tk
          }
        }
      }
    }
    teilzaehlung_total_count: teilzaehlung_aggregate(where: $totalCountFilter) {
      aggregate {
        count
      }
    }
    teilzaehlung_filtered_count: teilzaehlung_aggregate(
      where: $teilzaehlungFilter
    ) {
      aggregate {
        count
      }
    }
  }
  ${teilzaehlungFragment}
`

const Teilzaehlungen = ({ zaehlungId }) => {
  const store = useContext(StoreContext)
  const { insertTeilzaehlungRev, teilzaehlungsSorted, deletedFilter } = store

  const zaehlung = store.zaehlungs.get(zaehlungId) ?? {}
  const kulturId = zaehlung.kultur_id

  const hierarchyFilter = { zaehlung_id: { _eq: zaehlungId } }
  const totalCountFilter = {
    ...hierarchyFilter,
    ...deletedFilter,
  }
  const { error, loading } = useQuery(allDataQuery, {
    variables: {
      teilzaehlungFilter: totalCountFilter,
      totalCountFilter,
    },
  })

  const storeRows = teilzaehlungsSorted

  const kulturOption = store.kultur_options.get(kulturId) ?? {}
  const { tk } = kulturOption

  const onClickNew = useCallback(() => {
    insertTeilzaehlungRev()
  }, [insertTeilzaehlungRev])

  const showNew = storeRows.length === 0 || tk
  const title = tk ? 'Teil-Zählungen' : 'Mengen'
  const rows = teilzaehlungsSorted.filter((v) => v.zaehlung_id === zaehlungId)

  if (loading && !rows.length) {
    return <Container>Lade...</Container>
  }
  if (error && !error.message.includes('Failed to fetch')) {
    return (
      <Container>{`Fehler beim Laden der Daten: ${error.message}`}</Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container>
        <TitleRow>
          <Title>{title}</Title>
          <div>
            {kulturId && <Settings kulturId={kulturId} />}
            {showNew && (
              <IconButton
                aria-label="Neu"
                title="Neue Teil-Zählung"
                onClick={onClickNew}
              >
                <FaPlus />
              </IconButton>
            )}
          </div>
        </TitleRow>
        <TeilzaehlungenRows zaehlungId={zaehlungId} kulturId={kulturId} />
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlungen)
