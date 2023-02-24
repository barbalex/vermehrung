import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import StoreContext from '../../../../storeContext'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const HerkunftAddButton = () => {
  const store = useContext(StoreContext)
  const { insertHerkunftRev } = store

  const add = useCallback(() => {
    insertHerkunftRev()
  }, [insertHerkunftRev])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Herkunft"
        title="neue Herkunft"
        onClick={add}
        size="large">
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  );
}

export default observer(HerkunftAddButton)
