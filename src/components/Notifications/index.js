import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

const Container = styled.div`
  padding: 5px;
  z-index: 10;
  position: absolute;
  bottom: 10px;
  left: 10px;
`

import { StoreContext } from '../../models/reactUtils'
import Notification from './Notification'

const Notifications = () => {
  const store = useContext(StoreContext)
  const { notificationsSorted } = store
  console.log(
    'Notifications, notificationsSorted:',
    notificationsSorted.slice(),
  )

  return (
    <Container>
      {notificationsSorted.map((n) => (
        <Notification key={n.id} notification={n} />
      ))}
    </Container>
  )
}

export default observer(Notifications)
