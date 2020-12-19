import React, { useCallback, useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import Checkbox from '@material-ui/core/Checkbox'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../../../../storeContext'

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

  const [dataState, setDataState] = useState({ artQkChoosen })
  useEffect(() => {
    const observable = qk.art_qk_choosens
      .extend(Q.where('art_id', artId), Q.where('qk_id', qk.id))
      .observeWithColumns(['choosen'])
    const subscription = observable.subscribe((artQkChoosen) =>
      setDataState({ artQkChoosen }),
    )

    return () => subscription.unsubscribe()
  }, [artId, qk.art_qk_choosens, qk.id])
  const { artQkChoosen } = dataState

  const checked = artQkChoosen?.choosen

  const onChange = useCallback(
    (event) => {
      artQkChoosen.edit({
        field: 'choosen',
        value: event.target.checked,
        store,
      })
    },
    [artQkChoosen, store],
  )

  if (!artQkChoosen) return null

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
