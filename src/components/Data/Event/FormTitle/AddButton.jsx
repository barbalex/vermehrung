import { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const EventAddButton = observer(() => {
  const store = useContext(MobxStoreContext)
  const { insertEventRev } = store

  const add = useCallback(() => {
    insertEventRev()
  }, [insertEventRev])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neuer Event"
        title="neuer Event"
        onClick={add}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
})
