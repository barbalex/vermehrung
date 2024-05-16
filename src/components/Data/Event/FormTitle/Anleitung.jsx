import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import constants from '../../../../utils/constants.js'

const EventAnleitung = ({ asMenu }) => {
  const openEventdDocs = useCallback(() => {
    const url = `${constants?.getAppUri()}/Dokumentation/events`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }, [])

  if (asMenu) {
    return <MenuItem onClick={openEventdDocs}>Anleitung öffnen</MenuItem>
  }

  return (
    <IconButton
      aria-label="Anleitung öffnen"
      title="Anleitung öffnen"
      onClick={openEventdDocs}
      size="large"
    >
      <IoMdInformationCircleOutline />
    </IconButton>
  )
}

export default observer(EventAnleitung)
