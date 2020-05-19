import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { MdClose as CloseIcon } from 'react-icons/md'

import { StoreContext } from '../../models/reactUtils'

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  padding: 10px;
  border-radius: 3px;
  background-color: ${(props) => props['data-color']};
  color: white;
  font-weight: 500;
  min-height: 18px;
`
const StyledIconButton = styled(IconButton)`
  margin-left: 8px !important;
`
const colorMap = {
  error: '#D84315',
  success: '#00a300',
  info: '#4a148c',
  warning: 'orange',
}

const Notification = ({ notification: n }) => {
  const store = useContext(StoreContext)
  const { removeNotificationById } = store
  const color = colorMap[n.type] ?? 'error'
  const onClickClose = useCallback(() => removeNotificationById(n.id), [
    n.id,
    removeNotificationById,
  ])
  //console.log('Notification, notification:', { n, color, type: n.type }))

  return (
    <Container data-color={color}>
      <div>{n.message}</div>
      <StyledIconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={onClickClose}
        title="Diese Meldung schliessen"
        size="small"
      >
        <CloseIcon />
      </StyledIconButton>
    </Container>
  )
}

export default observer(Notification)
