import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import Checkbox from '@material-ui/core/Checkbox'
import { v1 as uuidv1 } from 'uuid'

import { useQuery, StoreContext } from '../../../../../../models/reactUtils'

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

const ChooseArtQkRow = ({ artId, qk }) => {
  const store = useContext(StoreContext)

  const { loading, error } = useQuery((store) =>
    store.queryArt_qk_choosen({
      where: { art_id: { _eq: artId }, qk_name: { _eq: qk.name } },
    }),
  )
  const artQkChoosen = [...store.art_qk_choosens.values()].find(
    (v) => v.art_id === artId && v.qk_name === qk.name,
  )

  const artQkChoosenId = artQkChoosen?.id
  const checked = !loading && !!artQkChoosenId

  const onChange = useCallback(async () => {
    // 1. if checked, delete artQkChoosen
    // 2. else create artQkChoosen
    if (checked) {
      return store.mutateDelete_art_qk_choosen(
        {
          where: {
            art_id: { _eq: artId },
            qk_name: { _eq: qk.name },
          },
        },
        undefined,
        () => store.deleteKulturQkChoosenModel({ id: artQkChoosenId }),
      )
    }
    store.mutateInsert_art_qk_choosen_one({
      object: { art_id: artId, qk_name: qk.name, id: uuidv1() },
      on_conflict: {
        constraint: 'art_qk_choosen_pkey',
        update_columns: ['id'],
      },
    })
  }, [artId, artQkChoosenId, checked, qk.name, store])

  if (error) {
    return (
      <Row>
        <Titel>{`${qk?.titel}, Fehler:`}</Titel>
        <Beschreibung>{error.message}</Beschreibung>
      </Row>
    )
  }
  return (
    <Row>
      <Check>
        <Checkbox checked={checked} onChange={onChange} color="primary" />
      </Check>
      <Titel>{qk?.titel}</Titel>
      {!!qk?.beschreibung && <Beschreibung>{qk?.beschreibung}</Beschreibung>}
    </Row>
  )
}

export default observer(ChooseArtQkRow)
