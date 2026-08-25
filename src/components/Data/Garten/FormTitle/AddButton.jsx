import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertGartenRev } from '../../../../modules/insertRev.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const GartenAddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neuer Garten"
        title="neuer Garten"
        onClick={insertGartenRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
