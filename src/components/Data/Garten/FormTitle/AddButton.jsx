import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import StoreContext from '../../../../storeContext'
import ErrorBoundary from '../../../shared/ErrorBoundary.jsx'

const GartenAddButton = () => {
  const store = useContext(StoreContext)
  const { insertGartenRev } = store

  const add = useCallback(() => {
    insertGartenRev()
  }, [insertGartenRev])

  return (
    <ErrorBoundary>
      <IconButton aria-label="neuer Garten" title="neuer Garten" onClick={add} size="large">
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  );
}

export default observer(GartenAddButton)
