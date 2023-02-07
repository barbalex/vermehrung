import React, { useContext, useCallback } from 'react'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import {
  MdCloudDone as NetworkOn,
  MdCloudOff as NetworkOff,
} from 'react-icons/md'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import StoreContext from '../../../storeContext'

const OnlineButton = styled(IconButton)`
  /*cursor: default !important;*/
`
const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: rgba(0, 0, 0, 0);
  }
`

const Online = () => {
  const store = useContext(StoreContext)
  const { online, queuedQueries, showQueuedQueries, setShowQueuedQueries } =
    store
  const title = online
    ? 'Sie sind online'
    : queuedQueries.size
    ? `Sie sind offline. ${queuedQueries.size} wartende Operationen`
    : `Sie sind offline`

  // TODO:
  // 1. add menu to link to info
  // 2. add menu to list and edit pending queries
  const onClick = useCallback(() => {
    setShowQueuedQueries(!showQueuedQueries)
  }, [showQueuedQueries, setShowQueuedQueries])

  return (
    <OnlineButton
      color="inherit"
      aria-label={title}
      title={title}
      onClick={onClick}
    >
      <StyledBadge color="primary" badgeContent={queuedQueries.size} max={999}>
        {online ? <NetworkOn /> : <NetworkOff />}
      </StyledBadge>
    </OnlineButton>
  )
}

export default observer(Online)
