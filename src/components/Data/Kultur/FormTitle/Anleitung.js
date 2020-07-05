import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@material-ui/core/IconButton'

import getConstants from '../../../../utils/constants'

const constants = getConstants()

const KulturAnleitung = () => {
  const openKulturDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Kulturen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  return (
    <IconButton
      aria-label="Anleitung öffnen"
      title="Anleitung öffnen"
      onClick={openKulturDocs}
    >
      <IoMdInformationCircleOutline />
    </IconButton>
  )
}

export default observer(KulturAnleitung)
