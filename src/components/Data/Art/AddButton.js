import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'

const ArtAddButton = () => {
  const store = useContext(StoreContext)
  const { insertArtRev } = store

  const add = useCallback(() => {
    insertArtRev()
  }, [insertArtRev])

  return (
    <ErrorBoundary>
      <IconButton aria-label="neue Art" title="neue Art" onClick={add}>
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(ArtAddButton)
