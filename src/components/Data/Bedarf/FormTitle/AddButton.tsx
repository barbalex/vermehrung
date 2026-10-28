import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { insertBedarfRev } from '../../../../modules/insertRev.ts'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'

export const BedarfAddButton = () => {
  const onClick = () =>
    insertBedarfRev({ values: { jahr: new Date().getFullYear() } })

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Neuer Bedarf"
        title="Neuer Bedarf"
        onClick={onClick}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
