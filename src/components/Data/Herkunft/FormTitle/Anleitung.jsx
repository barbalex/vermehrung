import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import { constants } from '../../../../utils/constants.js'

export const HerkunftAnleitung = observer(({ asMenu }) => {
  const openHerkunftDocs = useCallback(() => {
    const url = `${constants?.getAppUri()}/Dokumentation/herkuenfte`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }, [])

  if (asMenu) {
    return <MenuItem onClick={openHerkunftDocs}>Anleitung öffnen</MenuItem>
  }

  return (
    <IconButton
      aria-label="Anleitung öffnen"
      title="Anleitung öffnen"
      onClick={openHerkunftDocs}
      size="large"
    >
      <IoMdInformationCircleOutline />
    </IconButton>
  )
})
