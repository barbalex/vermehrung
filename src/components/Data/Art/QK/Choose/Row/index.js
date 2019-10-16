import React, { useCallback } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import Checkbox from '@material-ui/core/Checkbox'
import { useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'

import query from './query'
import { artQkChoosen as artQkChoosenFragment } from '../../../../../../utils/fragments'

const Row = styled.div`
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #e8e8e8;
  min-height: 52px;
`
const Check = styled.div`
  padding: 0 5px;
`
const Titel = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
`
const Beschreibung = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
`

const ChooseArtQkRow = ({ artId, qk, refetchTab }) => {
  const client = useApolloClient()

  const { data, error, refetch } = useQuery(query, {
    variables: { artId, qkName: qk.name },
  })
  const artQkChoosen = get(data, 'art_qk_choosen')

  const checked = !!artQkChoosen

  const onChange = useCallback(async () => {
    // 1. if checked, delete artQkChoosen
    // 2. else create artQkChoosen
    const variables = { artId, qkName: qk.name }
    if (checked) {
      await client.mutate({
        mutation: gql`
          mutation deleteArtQkChoosen($artId: bigint!, $qkName: String!) {
            delete_art_qk_choosen(
              where: { artId: { _eq: $artId }, qkName: { _eq: $qkName } }
            ) {
              returning {
                ...ArtQkChoosenFields
              }
            }
          }
          ${artQkChoosenFragment}
        `,
        variables,
      })
    } else {
      await client.mutate({
        mutation: gql`
          mutation insertArtQkChoosen($artId: bigint!, $qkName: String!) {
            insert_art_qk_choosen(
              objects: [{ art_id: $artId, qk_name: $qkName }]
            ) {
              returning {
                ...ArtQkChoosenFields
              }
            }
          }
          ${artQkChoosenFragment}
        `,
        variables,
      })
    }
    // 3. refetch data
    refetch()
    setTimeout(() => refetchTab())
  }, [artId, checked, client, qk.name, refetch, refetchTab])

  if (error)
    return (
      <Row>
        <Check>Fehler</Check>
        <Titel>{qk.titel}</Titel>
        <Beschreibung>{qk.beschreibung}</Beschreibung>
      </Row>
    )
  return (
    <Row>
      <Check>
        <Checkbox checked={checked} onChange={onChange} color="primary" />
      </Check>
      <Titel>{qk.titel}</Titel>
      <Beschreibung>{qk.beschreibung}</Beschreibung>
    </Row>
  )
}

export default observer(ChooseArtQkRow)
