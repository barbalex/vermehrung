import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'

const ZaehlungAddButton = () => {
  const store = useContext(StoreContext)
  const { insertZaehlungRev } = store

  const add = useCallback(() => {
    insertZaehlungRev()
  }, [insertZaehlungRev])

  return (
    <ErrorBoundary>
      <IconButton aria-label="neue Zählung" title="neue Zählung" onClick={add}>
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(ZaehlungAddButton)
