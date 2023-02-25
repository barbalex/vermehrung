import React, { useCallback } from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import constants from '../../../../utils/constants'

const TeilkulturAnleitung = ({ asMenu }) => {
  const openTeilkulturDocs = useCallback(() => {
    const url = `${constants?.getAppUri()}/Dokumentation/teilkulturen`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }, [])

  if (asMenu) {
    return <MenuItem onClick={openTeilkulturDocs}>Anleitung öffnen</MenuItem>
  }

  return (
    <IconButton
      aria-label="Anleitung öffnen"
      title="Anleitung öffnen"
      onClick={openTeilkulturDocs}
      size="large"
    >
      <IoMdInformationCircleOutline />
    </IconButton>
  )
}

export default TeilkulturAnleitung
