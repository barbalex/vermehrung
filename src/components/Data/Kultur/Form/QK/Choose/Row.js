import React, { useCallback, useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import Checkbox from '@material-ui/core/Checkbox'
import { Q } from '@nozbe/watermelondb'

import { StoreContext } from '../../../../../../models/reactUtils'

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

  const [kulturQkChoosen, setKulturQkChoosen] = useState()
  useEffect(() => {
    qk.kultur_qk_choosens
      .extend(Q.where('kultur_id', kulturId), Q.where('qk_id', qk.id))
      .fetch()
      .then((kulturQkChoosen) => {
        setKulturQkChoosen(kulturQkChoosen[0])
      })
  }, [kulturId, qk.kultur_qk_choosens, qk.id])

  const checked = kulturQkChoosen?.choosen

  const onChange = useCallback(() => {
    console.log('ChooseKulturQkRow', {
      kulturQkChoosen,
      checked,
      kulturId,
      qk,
      qkName: qk.name,
      value: event.target.checked,
    })
    kulturQkChoosen.edit({
      field: 'choosen',
      value: event.target.checked,
      store,
    })
  }, [checked, kulturId, kulturQkChoosen, qk, store])

  if (!kulturQkChoosen) return null

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
