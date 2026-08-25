import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertTeilkulturRev } from '../../../../modules/insertRev.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const TeilkulturAddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Teilkultur"
        title="neue Teilkultur"
        onClick={insertTeilkulturRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
