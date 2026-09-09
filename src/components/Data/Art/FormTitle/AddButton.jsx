import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertArtRev } from '../../../../modules/insertRev.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const AddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Art"
        title="neue Art"
        onClick={insertArtRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
