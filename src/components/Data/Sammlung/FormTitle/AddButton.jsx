import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const SammlungAddButton = observer(() => {
  const store = useContext(MobxStoreContext)
  const { insertSammlungRev } = store

  const add = useCallback(() => {
    insertSammlungRev()
  }, [insertSammlungRev])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Sammlung"
        title="neue Sammlung"
        onClick={add}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
})
