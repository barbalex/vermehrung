import React, { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import {
  MdCloudDone as NetworkOn,
  MdCloudOff as NetworkOff,
} from 'react-icons/md'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../models/reactUtils'

const OnlineButton = styled(IconButton)`
  cursor: default !important;
`

const Online = () => {
  const store = useContext(StoreContext)
  const { online, queuedQueries } = store
  const title = online
    ? 'Sie sind online'
    : queuedQueries.size
    ? `Sie sind offline. ${queuedQueries.size} wartende Operationen`
    : `Sie sind offline`

  return (
    <OnlineButton color="inherit" aria-label={title} title={title}>
      <Badge color="primary" badgeContent={queuedQueries.size}>
        {online ? <NetworkOn /> : <NetworkOff />}
      </Badge>
    </OnlineButton>
  )
}

export default observer(Online)
