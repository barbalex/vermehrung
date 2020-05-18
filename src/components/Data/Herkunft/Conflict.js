import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'

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

const Conflict = ({ id, rev, row, callbackAfterEditingConflict }) => {
  const store = useContext(StoreContext)
  const { user, enqueNotification } = store

  const { data, error, loading } = useQuery((store) =>
    store.queryHerkunft_rev({
      where: { _rev: { _eq: rev }, herkunft_id: { _eq: id } },
    }),
  )

  const revRow = data?.herkunft_rev?.[0] || {}
  /*const revRow =
    [...store.herkunft_revs.values()].find(
      (v) => v._rev === rev && v.herkunft_id === id,
    ) || {}*/
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
      id: uuidv1(),
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
    //queryFromHerkunft.refetch()
    callbackAfterEditingConflict()
  }, [
    callbackAfterEditingConflict,
    enqueNotification,
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

export default observer(Conflict)
