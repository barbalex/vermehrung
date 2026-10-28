import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertPersonRev } from '../../../../modules/insertRev.ts'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'

export const PersonAddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Person"
        title="neue Person"
        onClick={insertPersonRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
