import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import { insertKulturRev } from '../../../../modules/insertRev.ts'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'

export const KulturAddButton = ({ asMenu }: { asMenu: boolean }) => {
  if (asMenu) {
    return <MenuItem onClick={insertKulturRev}>neue Kultur</MenuItem>
  }

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Kultur"
        title="neue Kultur"
        onClick={insertKulturRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}
