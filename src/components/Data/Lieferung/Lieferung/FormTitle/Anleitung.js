import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import getConstants from '../../../../../utils/constants'

const constants = getConstants()

const LieferungAnleitung = ({ asMenu }) => {
  const openLieferungDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Lieferungen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  if (asMenu) {
    return <MenuItem onClick={openLieferungDocs}>Anleitung öffnen</MenuItem>
  }

  return (
    <IconButton
      aria-label="Anleitung öffnen"
      title="Anleitung öffnen"
      onClick={openLieferungDocs}
      size="large">
      <IoMdInformationCircleOutline />
    </IconButton>
  );
}

export default observer(LieferungAnleitung)
