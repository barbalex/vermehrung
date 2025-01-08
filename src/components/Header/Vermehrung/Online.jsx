import React, { useContext, useCallback } from 'react'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import {
  MdCloudDone as NetworkOn,
  MdCloudOff as NetworkOff,
} from 'react-icons/md'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'

import StoreContext from '../../../storeContext.js'

const OnlineButton = styled(IconButton)`
  /*cursor: default !important;*/
`
const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: rgba(0, 0, 0, 0);
  }
`

export const Online = observer(() => {
  const store = useContext(StoreContext)
  const { online, queuedQueries } = store
  const { pathname } = useLocation()
  const navigate = useNavigate()

  console.log('Online, pathname:', pathname)
  const showingQueuedQueries =
    pathname === '/Vermehrung/ausstehende-Operationen'

  const title =
    online ? 'Sie sind online'
    : queuedQueries.size ?
      `Sie sind offline. ${queuedQueries.size} wartende Operationen`
    : `Sie sind offline`

  // TODO:
  // 1. add menu to link to info
  // 2. add menu to list and edit pending queries
  const onClick = useCallback(() => {
    console.log('Online.onClick', { pathname, history: window.history })
    if (pathname === '/Vermehrung/ausstehende-Operationen') {
      const canGoBack = location.key !== 'default'
      if (canGoBack) {
        navigate(-1)
      } else {
        navigate('/Vermehrung', { replace: true })
      }
    } else {
      navigate('/Vermehrung/ausstehende-Operationen')
    }
  }, [navigate, pathname])

  return (
    <OnlineButton
      color="inherit"
      aria-label={title}
      title={title}
      onClick={onClick}
    >
      <StyledBadge
        color="primary"
        badgeContent={queuedQueries.size}
        max={999}
      >
        {online ?
          <NetworkOn />
        : <NetworkOff />}
      </StyledBadge>
    </OnlineButton>
  )
})
