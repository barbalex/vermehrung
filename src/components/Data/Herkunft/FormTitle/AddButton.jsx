import { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const HerkunftAddButton = observer(() => {
  const store = useContext(MobxStoreContext)
  const { insertHerkunftRev } = store

  const add = useCallback(() => {
    insertHerkunftRev()
  }, [insertHerkunftRev])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Herkunft"
        title="neue Herkunft"
        onClick={add}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
})
