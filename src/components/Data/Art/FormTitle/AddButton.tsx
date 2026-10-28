import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertArtRev } from '../../../../modules/insertRev.ts'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'

export const AddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Art"
        title="neue Art"
        onClick={() => void insertArtRev({})}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
