import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import MenuItem from '@material-ui/core/MenuItem'

import getConstants from '../../../../utils/constants'

const constants = getConstants()

const SlAnleitung = ({ asMenu }) => {
  const openDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Sammel-Lieferungen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  if (asMenu) {
    return <MenuItem onClick={openDocs}>Anleitung öffnen</MenuItem>
  }

  return (
    <IconButton
      aria-label="Anleitung öffnen"
      title="Anleitung öffnen"
      onClick={openDocs}
    >
      <IoMdInformationCircleOutline />
    </IconButton>
  )
}

export default observer(SlAnleitung)
