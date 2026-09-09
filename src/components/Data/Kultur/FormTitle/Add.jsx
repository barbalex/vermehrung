import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import { insertKulturRev } from '../../../../modules/insertRev.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const KulturAddButton = ({ asMenu }) => {
  if (asMenu) {
    return <MenuItem onClick={insertKulturRev}>neue Kultur</MenuItem>
  }

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Kultur"
        title="neue Kultur"
        onClick={insertKulturRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
