import React, { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
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
  const { online } = store
  const title = online ? 'Sie sind online' : 'Sie sind offline'

  return (
    <OnlineButton color="inherit" aria-label={title} title={title}>
      {online ? <NetworkOn /> : <NetworkOff />}
    </OnlineButton>
  )
}

export default observer(Online)
