import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertEventRev } from '../../../../modules/insertRev.ts'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'

export const EventAddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neuer Event"
        title="neuer Event"
        onClick={() => void insertEventRev({})}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
