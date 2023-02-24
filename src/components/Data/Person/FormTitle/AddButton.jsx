import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import StoreContext from '../../../../storeContext'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const PersonAddButton = () => {
  const store = useContext(StoreContext)
  const { insertPersonRev } = store

  const add = useCallback(() => {
    insertPersonRev()
  }, [insertPersonRev])

  return (
    <ErrorBoundary>
      <IconButton aria-label="neue Person" title="neue Person" onClick={add} size="large">
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  );
}

export default observer(PersonAddButton)
