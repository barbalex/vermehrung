import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

const TeilkulturAddButton = () => {
  const store = useContext(MobxStoreContext)
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
        size="large">
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  );
}

export default observer(TeilkulturAddButton)
