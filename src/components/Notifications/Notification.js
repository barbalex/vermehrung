import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { StoreContext } from '../../models/reactUtils'

const Container = styled.div`
  margin: 5px;
  padding: 10px;
  border-radius: 3px;
  background-color: ${(props) => props['data-color']};
`
const colorMap = {
  error: '#ff7246',
  success: '#00d700',
  info: '#4a148c1a',
  warning: 'orange',
}

const Notification = ({ notification: n }) => {
  const store = useContext(StoreContext)
  const color = colorMap[n.type] ?? 'error'
  console.log('Notification, notification:', { n, color, type: n.type })

  return (
    <Container data-color={color}>
      <p>{n.text}</p>
    </Container>
  )
}

export default observer(Notification)
