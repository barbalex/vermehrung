import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

const SammelLieferungAddButton = () => {
  const store = useContext(MobxStoreContext)
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
        size="large">
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  );
}

export default observer(SammelLieferungAddButton)
