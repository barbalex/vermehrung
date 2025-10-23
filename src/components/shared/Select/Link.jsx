import { FaExternalLinkAlt } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { constants } from '../../../utils/constants.js'

// link is active node array
export const Link = ({ link }) => {
  const open = (e) => {
    e.stopPropagation()
    const url = `${constants?.getAppUri()}/Vermehrung/${link.join('/')}`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }

  return (
    <IconButton
      aria-label="in neuem Fenster öffnen"
      title="in neuem Fenster öffnen"
      onClick={open}
      size="small"
    >
      <FaExternalLinkAlt />
    </IconButton>
  )
}
