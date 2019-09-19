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
  kulturFelder as kulturFelderFragment,
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
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`

const query = gql`
  query TeilzaehlungenQuery($zaehlId: Int) {
    teilzaehlung(
      where: { zaehlung_id: { _eq: $zaehlId } }
      order_by: { teilkultur: { name: asc_nulls_first } }
    ) {
      ...TeilzaehlungFields
      teilkultur {
        ...TeilkulturFields
      }
    }
  }
  ${teilzaehlungFragment}
  ${teilkulturFragment}
`
const insertTeilzaehlungMutation = gql`
  mutation insertDataset($zaehlId: Int!) {
    insert_teilzaehlung(objects: [{ zaehlung_id: $zaehlId }]) {
      returning {
        ...TeilzaehlungFields
      }
    }
  }
  ${teilzaehlungFragment}
`
const kulturFelderQuery = gql`
  query kulturFelderQuery($kulturId: Int) {
    kultur_felder(where: { kultur_id: { _eq: $kulturId } }) {
      ...KulturFelderFields
    }
  }
  ${kulturFelderFragment}
`

const Teilzaehlungen = ({ zaehlung }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const { data, error, loading, refetch } = useQuery(query, {
    variables: { zaehlId: zaehlung.id },
  })
  const rows = get(data, 'teilzaehlung', [])

  const kulturFelderResult = useQuery(kulturFelderQuery, {
    variables: { kulturId: zaehlung.kultur_id },
  })

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
    refetch()
  }, [])

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
          <Title>Teil-Zählungen</Title>
          <div>
            <Settings
              kulturId={zaehlung.kultur_id}
              kulturFelderResult={kulturFelderResult}
            />
            <IconButton
              aria-label="Neu"
              title="Neue Teil-Zählung"
              onClick={onClickNew}
            >
              <FaPlus />
            </IconButton>
          </div>
        </TitleRow>
        <TeilzaehlungenRows
          rows={rows}
          kulturFelderResult={kulturFelderResult}
          zaehlung={zaehlung}
          refetchTz={refetch}
        />
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlungen)
