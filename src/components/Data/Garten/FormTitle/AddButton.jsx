import { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const GartenAddButton = observer(() => {
  const store = useContext(MobxStoreContext)
  const { insertGartenRev } = store

  const add = useCallback(() => {
    insertGartenRev()
  }, [insertGartenRev])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neuer Garten"
        title="neuer Garten"
        onClick={add}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
})
