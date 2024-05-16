import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import StoreContext from '../../../storeContext'
import ErrorBoundary from '../../shared/ErrorBoundary.jsx'

const KulturAddButton = ({ asMenu }) => {
  const store = useContext(StoreContext)
  const { insertKulturRev } = store

  const add = useCallback(() => {
    insertKulturRev()
  }, [insertKulturRev])

  if (asMenu) {
    return <MenuItem onClick={add}>neue Kultur</MenuItem>
  }

  return (
    <ErrorBoundary>
      <IconButton aria-label="neue Kultur" title="neue Kultur" onClick={add} size="large">
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  );
}

export default observer(KulturAddButton)
