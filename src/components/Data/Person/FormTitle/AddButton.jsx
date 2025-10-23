import { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const PersonAddButton = observer(() => {
  const store = useContext(MobxStoreContext)
  const { insertPersonRev } = store

  const add = useCallback(() => {
    insertPersonRev()
  }, [insertPersonRev])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Person"
        title="neue Person"
        onClick={add}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
})
