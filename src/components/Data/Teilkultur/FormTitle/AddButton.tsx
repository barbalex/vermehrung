import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertTeilkulturRev } from '../../../../modules/insertRev.ts'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'

export const TeilkulturAddButton = () => {
  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Teilkultur"
        title="neue Teilkultur"
        onClick={() => void insertTeilkulturRev({})}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
