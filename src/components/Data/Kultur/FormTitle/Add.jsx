import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

export const KulturAddButton = observer(({ asMenu }) => {
  const store = useContext(MobxStoreContext)
  const { insertKulturRev } = store

  if (asMenu) {
    return <MenuItem onClick={insertKulturRev}>neue Kultur</MenuItem>
  }

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Kultur"
        title="neue Kultur"
        onClick={insertKulturRev}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
})
