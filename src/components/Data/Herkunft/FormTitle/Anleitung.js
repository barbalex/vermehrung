import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'

import getConstants from '../../../../utils/constants'

const constants = getConstants()

const KulturAnleitung = ({ asMenu }) => {
  const openHerkunftDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Herkuenfte`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  if (asMenu) {
    return <MenuItem onClick={openHerkunftDocs}>Anleitung öffnen</MenuItem>
  }

  return (
    <IconButton
      aria-label="Anleitung öffnen"
      title="Anleitung öffnen"
      onClick={openHerkunftDocs}
    >
      <IoMdInformationCircleOutline />
    </IconButton>
  )
}

export default observer(KulturAnleitung)
