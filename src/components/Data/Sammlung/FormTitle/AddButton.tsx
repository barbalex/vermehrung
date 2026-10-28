import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertSammlungRev } from '../../../../modules/insertRev.ts'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'

export const SammlungAddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Sammlung"
        title="neue Sammlung"
        onClick={insertSammlungRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
