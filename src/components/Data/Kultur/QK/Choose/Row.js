import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import Checkbox from '@material-ui/core/Checkbox'
import { v1 as uuidv1 } from 'uuid'

import { useQuery, StoreContext } from '../../../../../models/reactUtils'

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

const ChooseKulturQkRow = ({ kulturId, qk }) => {
  const store = useContext(StoreContext)

  const { loading, error } = useQuery((store) =>
    store.queryKultur_qk_choosen({
      where: { kultur_id: { _eq: kulturId }, qk_name: { _eq: qk.name } },
    }),
  )
  const kulturQkChoosen = [...store.kultur_qk_choosens.values()].find(
    (v) => v.kultur_id === kulturId && v.qk_name === qk.name,
  )

  const kulturQkChoosenId = kulturQkChoosen?.id
  const checked = !loading && !!kulturQkChoosenId

  const onChange = useCallback(() => {
    // 1. if checked, delete kulturQkChoosen
    // 2. else create kulturQkChoosen
    if (checked) {
      return store.mutateDelete_kultur_qk_choosen(
        {
          where: {
            kultur_id: { _eq: kulturId },
            qk_name: { _eq: qk.name },
          },
        },
        undefined,
        () => store.deleteKulturQkChoosenModel({ id: kulturQkChoosenId }),
      )
    }
    store.mutateInsert_kultur_qk_choosen_one({
      object: { kultur_id: kulturId, qk_name: qk.name, id: uuidv1() },
      on_conflict: {
        constraint: 'kultur_qk_choosen_pkey',
        update_columns: ['id'],
      },
    })
  }, [checked, kulturId, kulturQkChoosenId, qk.name, store])

  if (error) {
    return (
      <Row>
        <Check>Fehler</Check>
        <Titel>{qk.titel}</Titel>
        <Beschreibung>{qk.beschreibung}</Beschreibung>
      </Row>
    )
  }
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
