import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import IconButton from '@material-ui/core/IconButton'
import { FaPlus } from 'react-icons/fa'

import storeContext from '../../../../storeContext'
import ErrorBoundary from '../../../ErrorBoundary'
import { teilzaehlung as teilzaehlungFragment } from '../../../../utils/fragments'
import Teilzaehlung from './Teilzaehlung'

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
      order_by: { ort: asc_nulls_first }
    ) {
      ...TeilzaehlungFields
    }
  }
  ${teilzaehlungFragment}
`
const mutation = gql`
  mutation insertDataset($zaehlId: Int!) {
    insert_teilzaehlung(objects: [{ zaehlung_id: $zaehlId }]) {
      returning {
        ...TeilzaehlungFields
      }
    }
  }
  ${teilzaehlungFragment}
`

const Teilzaehlungen = ({ zaehlId, kulturZaehlungFelder }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const { data, error, loading, refetch } = useQuery(query, {
    variables: { zaehlId },
  })

  const rows = get(data, 'teilzaehlung', [])

  const onClickNew = useCallback(async () => {
    try {
      await client.mutate({
        mutation,
        variables: {
          zaehlId,
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

  if (rows.length === 0) return null

  // TODO: enable adding new row
  return (
    <ErrorBoundary>
      <Container>
        <TitleRow>
          <Title>Teil-Zählungen</Title>
          <div>
            <IconButton
              aria-label="Neu"
              title="Neue Teil-Zählung"
              onClick={onClickNew}
            >
              <FaPlus />
            </IconButton>
          </div>
        </TitleRow>
        {rows.map((r, index) => (
          <Teilzaehlung
            key={r.id}
            teilzaehlung={r}
            kulturZaehlungFelder={kulturZaehlungFelder}
            index={index}
            refetch={refetch}
          />
        ))}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlungen)
