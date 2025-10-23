import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const HerkunftAddButton = observer(() => {
  const store = useContext(MobxStoreContext)
  const { insertHerkunftRev } = store

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Herkunft"
        title="neue Herkunft"
        onClick={insertHerkunftRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
})
