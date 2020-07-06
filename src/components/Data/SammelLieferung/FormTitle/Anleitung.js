import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'

import getConstants from '../../../../utils/constants'

const constants = getConstants()

const SlAnleitung = () => {
  const openDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Sammel-Lieferungen`
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
      onClick={openDocs}
    >
      <IoMdInformationCircleOutline />
    </IconButton>
  )
}

export default observer(SlAnleitung)
