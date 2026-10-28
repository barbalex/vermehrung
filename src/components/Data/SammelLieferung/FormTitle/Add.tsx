import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertSammelLieferungRev } from '../../../../modules/insertRev.ts'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'

export const SammelLieferungAddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Sammel-Lieferung"
        title="neue Sammel-Lieferung"
        onClick={insertSammelLieferungRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
