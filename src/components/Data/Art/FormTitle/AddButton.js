import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import StoreContext from '../../../../storeContext'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const ArtAddButton = () => {
  const store = useContext(StoreContext)
  const { insertArtRev } = store

  return (
    <ErrorBoundary>
      <IconButton aria-label="neue Art" title="neue Art" onClick={insertArtRev}>
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(ArtAddButton)
