import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import StoreContext from '../../../../mobxStoreContext.js'
import ErrorBoundary from '../../../shared/ErrorBoundary.jsx'

const SammlungAddButton = () => {
  const store = useContext(StoreContext)
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
        size="large">
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  );
}

export default observer(SammlungAddButton)
