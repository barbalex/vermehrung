import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertLieferungRev } from '../../../../../modules/insertRev.js'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'

export const LieferungAddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Lieferung"
        title="neue Lieferung"
        onClick={insertLieferungRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
