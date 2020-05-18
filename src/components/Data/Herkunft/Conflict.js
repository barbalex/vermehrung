import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import Button from '@material-ui/core/Button'
import md5 from 'blueimp-md5'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import ConflictExplainer from '../../shared/ConflictExplainer'
import ConflictData from '../../shared/ConflictData'

const Container = styled.div`
  padding: 10px;
`
const Title = styled.h4`
  margin-bottom: 10px;
`
const Rev = styled.span`
  font-weight: normal;
  padding-left: 7px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8em;
`
const ButtonRow = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-evenly;
`
const StyledButton = styled(Button)`
  > span {
    text-transform: none;
  }
`

const query = gql`
  query herkunftForConflictQuery($id: uuid!, $rev: String!) {
    herkunft_rev(where: { herkunft_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      _rev
      _deleted
      _depth
      _parent_rev
      _revisions
      bemerkungen
      changed
      changed_by
      gemeinde
      geom_point
      herkunft_id
      kanton
      land
      lokalname
      nr
    }
  }
`

const Conflict = ({ id, rev, row }) => {
  const store = useContext(StoreContext)
  const { user, enqueNotification } = store
  //console.log('Conflict:', { id, rev })
  // TODO: this does not update without a key on the component!!!!!!
  // also it seems not to update the loading key...
  const { data, error, loading, query: queryFromHerkunft } = useQuery(query, {
    variables: { rev, id },
  })

  const revRow = data?.herkunft_rev?.[0] || {}
  //console.log('Conflict:', { revRow, data })
  const dataArray = [
    { key: 'nr', value: revRow.nr, label: 'Nr' },
    { key: 'lokalname', value: revRow.lokalname, label: 'Lokalname' },
    { key: 'gemeinde', value: revRow.gemeinde, label: 'Gemeinde' },
    { key: 'kanton', value: revRow.kanton, label: 'Kanton' },
    { key: 'land', value: revRow.land, label: 'Land' },
    { key: 'bemerkungen', value: revRow.bemerkungen, label: 'Bemerkungen' },
  ]

  const onClickVerwerfen = useCallback(async () => {
    const depth = revRow._depth + 1
    const newObject = {
      herkunft_id: revRow.herkunft_id,
      nr: revRow.nr,
      lokalname: revRow.lokalname,
      gemeinde: revRow.gemeinde,
      kanton: revRow.kanton,
      land: revRow.land,
      bemerkungen: revRow.bemerkungen,
      changed: new window.Date().toISOString(),
      changed_by: user.email,
      _parent_rev: revRow._rev,
      _depth: depth,
      _deleted: true,
    }
    const rev = `${depth}-${md5(JSON.stringify(newObject))}`
    newObject._rev = rev
    try {
      await store.mutateInsert_herkunft_rev_one({
        object: newObject,
        on_conflict: {
          constraint: 'herkunft_rev_pkey',
          update_columns: ['id'],
        },
      })
    } catch (error) {
      enqueNotification({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    }
    queryFromHerkunft.refetch()
  }, [
    enqueNotification,
    queryFromHerkunft,
    revRow._depth,
    revRow._rev,
    revRow.bemerkungen,
    revRow.gemeinde,
    revRow.herkunft_id,
    revRow.kanton,
    revRow.land,
    revRow.lokalname,
    revRow.nr,
    store,
    user.email,
  ])
  const onClickUebernehmen = useCallback(() => {
    console.log('TODO:')
  }, [])

  if (error) {
    return <Container>{error.message}</Container>
  }

  return (
    <Container>
      <Title>
        Widersprüchliche Version<Rev>{rev}</Rev>
      </Title>
      <ConflictExplainer name="Herkunft" />
      <ConflictData dataArray={dataArray} row={row} loading={loading} />
      <ButtonRow>
        <StyledButton onClick={onClickVerwerfen} variant="outlined">
          verwerfen
        </StyledButton>
        <StyledButton onClick={onClickUebernehmen} variant="outlined">
          übernehmen
        </StyledButton>
      </ButtonRow>
    </Container>
  )
}

export default Conflict
