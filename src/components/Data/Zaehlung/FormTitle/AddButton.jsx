import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const ZaehlungAddButton = observer(() => {
  const store = useContext(MobxStoreContext)
  const { insertZaehlungRev } = store

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
})
