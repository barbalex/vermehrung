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

const ChooseArtQkRow = ({ qk, userPersonOption }) => {
  const store = useContext(StoreContext)

  const checked = userPersonOption.art_qk_choosen.includes(qk.id)

  const onChange = useCallback(
    (event) => {
      const newValue = event.target.checked
        ? [...userPersonOption.art_qk_choosen, qk.id]
        : userPersonOption.art_qk_choosen.filter((id) => id !== qk.id)
      userPersonOption.edit({
        field: 'art_qk_choosen',
        value: newValue,
        store,
      })
    },
    [qk.id, store, userPersonOption],
  )

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
