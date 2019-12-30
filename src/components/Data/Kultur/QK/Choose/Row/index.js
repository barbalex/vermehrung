import React, { useCallback } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import Checkbox from '@material-ui/core/Checkbox'
import { useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'

import query from './query'
import { kulturQkChoosen as kulturQkChoosenFragment } from '../../../../../../utils/fragments'

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

const ChooseKulturQkRow = ({ kulturId, qk, refetchTab }) => {
  const client = useApolloClient()

  const { data, loading, error } = useQuery(query, {
    variables: { kulturId, qkName: qk.name },
  })
  const kulturQkChoosen = get(data, 'kultur_qk_choosen')

  const checked = !loading && !!kulturQkChoosen.length

  const onChange = useCallback(async () => {
    // 1. if checked, delete kulturQkChoosen
    // 2. else create kulturQkChoosen
    const variables = { kulturId, qkName: qk.name }
    if (checked) {
      await client.mutate({
        mutation: gql`
          mutation deleteKulturQkChoosen($kulturId: bigint!, $qkName: String!) {
            delete_kultur_qk_choosen(
              where: {
                kultur_id: { _eq: $kulturId }
                qk_name: { _eq: $qkName }
              }
            ) {
              returning {
                ...KulturQkChoosenFields
              }
            }
          }
          ${kulturQkChoosenFragment}
        `,
        variables,
      })
    } else {
      await client.mutate({
        mutation: gql`
          mutation insertKulturQkChoosen($kulturId: bigint!, $qkName: String!) {
            insert_kultur_qk_choosen(
              objects: [{ kultur_id: $kulturId, qk_name: $qkName }]
            ) {
              returning {
                ...KulturQkChoosenFields
              }
            }
          }
          ${kulturQkChoosenFragment}
        `,
        variables,
        refetchQueries: ['KulturQkChoosenQueryForRow'],
      })
    }
    setTimeout(() => refetchTab())
  }, [kulturId, checked, client, qk.name, refetchTab])

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

export default observer(ChooseKulturQkRow)
