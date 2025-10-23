import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const SammlungAddButton = observer(() => {
  const store = useContext(MobxStoreContext)
  const { insertSammlungRev } = store

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Sammlung"
        title="neue Sammlung"
        onClick={insertSammlungRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
})
