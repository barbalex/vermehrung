import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'

import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'

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
      <IconButton aria-label="neue Kultur" title="neue Kultur" onClick={add}>
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(KulturAddButton)
