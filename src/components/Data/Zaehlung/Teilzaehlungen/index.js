import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import IconButton from '@material-ui/core/IconButton'
import { FaPlus } from 'react-icons/fa'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../../../storeContext'
import {
  teilzaehlung as teilzaehlungFragment,
  teilkultur as teilkulturFragment,
} from '../../../../utils/fragments'
import TeilzaehlungenRows from './TeilzaehlungenRows'
import Settings from './Settings'

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

const teilzaehlungenQuery = gql`
  query TeilzaehlungenQuery($zaehlId: bigint) {
    teilzaehlung(
      where: { zaehlung_id: { _eq: $zaehlId } }
      order_by: { teilkultur: { name: asc_nulls_first } }
    ) {
      ...TeilzaehlungFields
    }
  }
  ${teilzaehlungFragment}
  ${teilkulturFragment}
`
const insertTeilzaehlungMutation = gql`
  mutation insertTeilzaehlung($zaehlId: bigint!) {
    insert_teilzaehlung(objects: [{ zaehlung_id: $zaehlId }]) {
      returning {
        ...TeilzaehlungFields
      }
    }
  }
  ${teilzaehlungFragment}
`

const Teilzaehlungen = ({ zaehlungResult }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const zaehlung = get(zaehlungResult.data, 'zaehlung', [{}])[0]

  const { data, error, loading, refetch: refetchTeilzaehlungen } = useQuery(
    teilzaehlungenQuery,
    {
      variables: { zaehlId: zaehlung.id },
    },
  )
  const rows = get(data, 'teilzaehlung', [])

  const { tk } = get(zaehlung, 'kultur.kultur_felder') || {}

  const onClickNew = useCallback(async () => {
    try {
      await client.mutate({
        mutation: insertTeilzaehlungMutation,
        variables: {
          zaehlId: zaehlung.id,
        },
      })
    } catch (error) {
      return enqueNotification({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    }
    refetchTeilzaehlungen()
  }, [client, enqueNotification, refetchTeilzaehlungen, zaehlung.id])

  const showNew = rows.length === 0 || tk
  const title = tk ? 'Teil-Zählungen' : 'Mengen'

  if (loading) {
    return <Container>Lade...</Container>
  }
  if (error) {
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
            {zaehlung.kultur_id && (
              <Settings
                kulturId={zaehlung.kultur_id}
                zaehlungResult={zaehlungResult}
              />
            )}
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
        <TeilzaehlungenRows
          rows={rows}
          zaehlungResult={zaehlungResult}
          refetchTz={refetchTeilzaehlungen}
          kulturId={zaehlung.kultur_id}
        />
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlungen)
