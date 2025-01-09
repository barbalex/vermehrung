import React, { useCallback } from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import { constants } from '../../../../utils/constants.js'

const KulturAnleitung = ({ asMenu }) => {
  const openKulturDocs = useCallback(() => {
    const url = `${constants?.getAppUri()}/Dokumentation/kulturen`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }, [])

  if (asMenu) {
    return <MenuItem onClick={openKulturDocs}>Anleitung öffnen</MenuItem>
  }

  return (
    <IconButton
      aria-label="Anleitung öffnen"
      title="Anleitung öffnen"
      onClick={openKulturDocs}
      size="large"
    >
      <IoMdInformationCircleOutline />
    </IconButton>
  )
}

export default KulturAnleitung
