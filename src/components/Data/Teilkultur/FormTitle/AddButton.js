import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../../models/reactUtils'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const TeilkulturAddButton = () => {
  const store = useContext(StoreContext)
  const { insertTeilkulturRev } = store

  const add = useCallback(() => {
    insertTeilkulturRev()
  }, [insertTeilkulturRev])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Teilkultur"
        title="neue Teilkultur"
        onClick={add}
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(TeilkulturAddButton)