import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import Checkbox from '@material-ui/core/Checkbox'

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

  const kulturQkChoosen = [...store.kultur_qk_choosens.values()].find(
    (v) => v.kultur_id === kulturId && v.qk_name === qk.name,
  )
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
    kulturQkChoosen.edit({ field: 'choosen', value: event.target.checked })
  }, [checked, kulturId, kulturQkChoosen, qk])

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
