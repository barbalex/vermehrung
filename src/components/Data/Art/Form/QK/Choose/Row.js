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

const ChooseArtQkRow = ({ artId, qk }) => {
  const store = useContext(StoreContext)

  const artQkChoosen = [...store.art_qk_choosens.values()].find(
    (v) => v.art_id === artId && v.qk_name === qk.name,
  )

  const checked = artQkChoosen.choosen

  const onChange = useCallback(
    (event) => {
      artQkChoosen.edit({ field: 'choosen', value: event.target.checked })
    },
    [artQkChoosen],
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
