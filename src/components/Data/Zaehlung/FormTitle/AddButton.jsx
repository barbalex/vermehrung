import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertZaehlungRev } from '../../../../modules/insertRev.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const ZaehlungAddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Zählung"
        title="neue Zählung"
        onClick={insertZaehlungRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
