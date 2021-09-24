import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import StoreContext from '../../../../storeContext'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const EventAddButton = () => {
  const store = useContext(StoreContext)
  const { insertEventRev } = store

  const add = useCallback(() => {
    insertEventRev()
  }, [insertEventRev])

  return (
    <ErrorBoundary>
      <IconButton aria-label="neuer Event" title="neuer Event" onClick={add} size="large">
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  );
}

export default observer(EventAddButton)
