import { useContext, useCallback } from 'react'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import {
  MdCloudDone as NetworkOn,
  MdCloudOff as NetworkOff,
} from 'react-icons/md'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router'

import { MobxStoreContext } from '../../../mobxStoreContext.js'

const OnlineButton = styled(IconButton)`
  /*cursor: default !important;*/
`
const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: rgba(0, 0, 0, 0);
  }
`

export const Online = observer(() => {
  const store = useContext(MobxStoreContext)
  const { online, queuedQueries } = store
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const title =
    online ? 'Sie sind online'
    : queuedQueries.size ?
      `Sie sind offline. ${queuedQueries.size} wartende Operationen`
    : `Sie sind offline`

  // TODO:
  // 1. add menu to link to info
  // 2. add menu to list and edit pending queries
  const onClick = useCallback(() => {
    // ISSUE: cant use navigate(-1) as that can navigate to same url and user has to click twice to go back
    if (pathname === '/Vermehrung/ausstehende-Operationen') {
      navigate('/Vermehrung')
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
