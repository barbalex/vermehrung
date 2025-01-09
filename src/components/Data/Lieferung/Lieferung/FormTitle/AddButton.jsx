import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'

export const LieferungAddButton = observer(() => {
  const store = useContext(MobxStoreContext)
  const { insertLieferungRev } = store

  const add = useCallback(() => {
    insertLieferungRev()
  }, [insertLieferungRev])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Lieferung"
        title="neue Lieferung"
        onClick={add}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
})
