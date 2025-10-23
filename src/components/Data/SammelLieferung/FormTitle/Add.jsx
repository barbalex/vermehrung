import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const SammelLieferungAddButton = observer(() => {
  const store = useContext(MobxStoreContext)
  const { insertSammelLieferungRev } = store

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Sammel-Lieferung"
        title="neue Sammel-Lieferung"
        onClick={insertSammelLieferungRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
})
