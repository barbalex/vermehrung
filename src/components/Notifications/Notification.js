import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { StoreContext } from '../../models/reactUtils'

const Container = styled.div`
  margin: 5px;
  padding: 10px;
  border-radius: 3px;
  background-color: ${(props) => props['data-color']};
  color: white;
  font-weight: 500;
`
const colorMap = {
  error: '#D84315',
  success: '#00a300',
  info: '#4a148c',
  warning: 'orange',
}

const Notification = ({ notification: n }) => {
  const store = useContext(StoreContext)
  const color = colorMap[n.type] ?? 'error'
  console.log('Notification, notification:', { n, color, type: n.type })

  return (
    <Container data-color={color}>
      <div>{n.message}</div>
    </Container>
  )
}

export default observer(Notification)
