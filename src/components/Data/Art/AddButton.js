import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useApolloClient } from '@apollo/react-hooks'
import ErrorBoundary from 'react-error-boundary'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import storeContext from '../../../storeContext'
import createNew from '../../TreeContainer/Tree/createNew'

const Art = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)

  const add = useCallback(() => {
    const node = { nodeType: 'folder', url: ['Arten'] }
    createNew({ node, store, client })
  }, [client, store])

  return (
    <ErrorBoundary>
      <IconButton aria-label="neue Art" title="neue Art" onClick={add}>
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(Art)
