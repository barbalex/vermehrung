import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertEventRev } from '../../../../modules/insertRev.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const EventAddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neuer Event"
        title="neuer Event"
        onClick={insertEventRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
