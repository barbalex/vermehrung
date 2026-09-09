import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertHerkunftRev } from '../../../../modules/insertRev.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const HerkunftAddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Herkunft"
        title="neue Herkunft"
        onClick={insertHerkunftRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
