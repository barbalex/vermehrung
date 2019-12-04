import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useApolloClient } from '@apollo/react-hooks'
import ErrorBoundary from 'react-error-boundary'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import storeContext from '../../../storeContext'
import createNew from '../../TreeContainer/Tree/createNew'

const SammelLieferungAddButton = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)

  const add = useCallback(() => {
    const node = { nodeType: 'folder', url: ['Sammel-Lieferungen'] }
    createNew({ node, store, client })
  }, [client, store])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Sammel-Lieferung"
        title="neue Sammel-Lieferung"
        onClick={add}
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(SammelLieferungAddButton)
