import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../../models/reactUtils'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const SammelLieferungAddButton = () => {
  const store = useContext(StoreContext)
  const { insertSammelLieferungRev } = store

  const add = useCallback(() => {
    insertSammelLieferungRev()
  }, [insertSammelLieferungRev])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Sammel-Lieferung"
        title="neue Sammel-Lieferung"
        onClick={add}
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(SammelLieferungAddButton)