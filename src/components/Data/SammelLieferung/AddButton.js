import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useApolloClient } from '@apollo/react-hooks'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../models/reactUtils'
import createNew from '../../TreeContainer/Tree/createNew'
import ErrorBoundary from '../../shared/ErrorBoundary'

const SammelLieferungAddButton = () => {
  const client = useApolloClient()
  const store = useContext(StoreContext)
  const { activeNodeArray } = store.tree

  const add = useCallback(() => {
    const node = { nodeType: 'table', url: activeNodeArray }
    createNew({ node, store, client })
  }, [activeNodeArray, client, store])

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
