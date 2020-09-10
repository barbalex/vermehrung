import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../../models/reactUtils'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const SammlungAddButton = () => {
  const store = useContext(StoreContext)
  const { insertSammlungRev } = store

  const add = useCallback(() => {
    insertSammlungRev()
  }, [insertSammlungRev])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Sammlung"
        title="neue Sammlung"
        onClick={add}
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(SammlungAddButton)
