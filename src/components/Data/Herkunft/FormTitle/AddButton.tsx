import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertHerkunftRev } from '../../../../modules/insertRev.ts'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'

export const HerkunftAddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Herkunft"
        title="neue Herkunft"
        onClick={() => void insertHerkunftRev({})}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
