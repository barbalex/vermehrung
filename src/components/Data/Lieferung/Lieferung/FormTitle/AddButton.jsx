import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import StoreContext from '../../../../../storeContext'
import ErrorBoundary from '../../../../shared/ErrorBoundary.jsx'

const LieferungAddButton = () => {
  const store = useContext(StoreContext)
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
        size="large">
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  );
}

export default observer(LieferungAddButton)
