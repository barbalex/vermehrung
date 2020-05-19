import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

const Container = styled.div``

import { StoreContext } from '../../models/reactUtils'

const Notification = ({ notification }) => {
  const store = useContext(StoreContext)
  console.log('Notification, notification:', notification)

  return (
    <Container>
      <p>{notification.text}</p>
    </Container>
  )
}

export default observer(Notification)
