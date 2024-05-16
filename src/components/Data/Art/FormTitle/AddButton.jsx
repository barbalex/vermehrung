import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import StoreContext from '../../../../storeContext'
import ErrorBoundary from '../../../shared/ErrorBoundary.jsx'

const ArtAddButton = () => {
  const store = useContext(StoreContext)
  const { insertArtRev } = store

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Art"
        title="neue Art"
        onClick={insertArtRev}
        size="large">
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  );
}

export default observer(ArtAddButton)
