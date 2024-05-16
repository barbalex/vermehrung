import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { MdClose as CloseIcon } from 'react-icons/md'
import sortBy from 'lodash/sortBy'

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

import StoreContext from '../../storeContext.js'
import Notification from './Notification'

const Notifications = () => {
  const store = useContext(StoreContext)
  const { removeAllNotifications, notifications } = store

  const notificationsSorted = sortBy([...notifications.values()], 'time')
    .reverse()
    // limit to 5
    .slice(0, 4)

  const onClickClose = useCallback(
    () => removeAllNotifications(),
    [removeAllNotifications],
  )

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
