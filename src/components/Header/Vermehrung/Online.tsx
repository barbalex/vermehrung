import { useContext } from 'react'
import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Badge from '@mui/material/Badge'
import {
  MdCloudDone as NetworkOn,
  MdCloudOff as NetworkOff,
} from 'react-icons/md'
import styled from '@emotion/styled'
import { useLocation, useNavigate } from 'react-router'

import { onlineAtom, queueSizeAtom } from '../../../store/index.ts'
import { MenuCloseContext } from '../../shared/MenuCloseContext.ts'

// keep this use of styled
const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: rgba(0, 0, 0, 0);
  }
`

export const Online = ({ asMenu }: { asMenu?: boolean }) => {
  const online = useAtomValue(onlineAtom)
  const queueSize = useAtomValue(queueSizeAtom)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const closeMenu = useContext(MenuCloseContext)

  const title = online
    ? 'Sie sind online'
    : queueSize
      ? `Sie sind offline. ${queueSize} wartende Operationen`
      : `Sie sind offline`

  // TODO:
  // 1. add menu to link to info
  // 2. add menu to list and edit pending queries
  const onClick = () => {
    // ISSUE: cant use navigate(-1) as that can navigate to same url and user has to click twice to go back
    if (pathname === '/Vermehrung/ausstehende-Operationen') {
      navigate('/Vermehrung')
    } else {
      navigate('/Vermehrung/ausstehende-Operationen')
    }
  }

  if (asMenu) {
    return (
      <MenuItem
        onClick={() => {
          closeMenu()
          onClick()
        }}
        aria-label={title}
        title={title}
      >
        <StyledBadge
          color="primary"
          badgeContent={queueSize}
          max={999}
          style={{ marginRight: 12 }}
        >
          {online ? <NetworkOn /> : <NetworkOff />}
        </StyledBadge>
        {title}
      </MenuItem>
    )
  }

  return (
    <IconButton
      color="inherit"
      aria-label={title}
      title={title}
      onClick={onClick}
    >
      <StyledBadge color="primary" badgeContent={queueSize} max={999}>
        {online ? <NetworkOn /> : <NetworkOff />}
      </StyledBadge>
    </IconButton>
  )
}
