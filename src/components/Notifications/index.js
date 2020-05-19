import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { MdClose as CloseIcon } from 'react-icons/md'

const Container = styled.div`
  padding: 5px;
  z-index: 10;
  position: absolute;
  bottom: 10px;
  left: 10px;
`
const StyledIconButton = styled(IconButton)`
  margin-left: 5px !important;
`

import { StoreContext } from '../../models/reactUtils'
import Notification from './Notification'

const Notifications = () => {
  const store = useContext(StoreContext)
  const { notificationsSorted, removeAllNotifications } = store
  const onClickClose = useCallback(() => removeAllNotifications(), [
    removeAllNotifications,
  ])

  if (notificationsSorted.length === 0) return null

  return (
    <Container>
      {notificationsSorted.map((n) => (
        <Notification key={n.id} notification={n} />
      ))}
      {notificationsSorted.length > 2 && (
        <StyledIconButton
          key="close"
          aria-label="Close"
          color="secondary"
          onClick={onClickClose}
          title="Alle Meldungen schliessen"
          size="small"
          edge="start"
        >
          <CloseIcon />
        </StyledIconButton>
      )}
    </Container>
  )
}

export default observer(Notifications)
