import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import StoreContext from '../../../../storeContext.js'
import ErrorBoundary from '../../../shared/ErrorBoundary.jsx'

const ZaehlungAddButton = () => {
  const store = useContext(StoreContext)
  const { insertZaehlungRev } = store

  const add = useCallback(() => {
    insertZaehlungRev()
  }, [insertZaehlungRev])

  return (
    <ErrorBoundary>
      <IconButton aria-label="neue Zählung" title="neue Zählung" onClick={add} size="large">
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  );
}

export default observer(ZaehlungAddButton)
