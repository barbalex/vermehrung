import React, { useCallback } from 'react'
import IconButton from '@mui/material/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import MenuItem from '@mui/material/MenuItem'

import { constants } from '../../../../utils/constants.js'

export const SammelLieferungAnleitung = ({ asMenu }) => {
  const openDocs = useCallback(() => {
    const url = `${constants?.getAppUri()}/Dokumentation/sammel-lieferungen`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }, [])

  if (asMenu) {
    return <MenuItem onClick={openDocs}>Anleitung öffnen</MenuItem>
  }

  return (
    <IconButton
      aria-label="Anleitung öffnen"
      title="Anleitung öffnen"
      onClick={openDocs}
      size="large"
    >
      <IoMdInformationCircleOutline />
    </IconButton>
  )
}
