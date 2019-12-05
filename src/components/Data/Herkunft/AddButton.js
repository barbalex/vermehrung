import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useApolloClient } from '@apollo/react-hooks'
import ErrorBoundary from 'react-error-boundary'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import storeContext from '../../../storeContext'
import createNew from '../../TreeContainer/Tree/createNew'

const HerkunftAddButton = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { activeNodeArray } = store.tree

  const add = useCallback(() => {
    const node = { nodeType: 'table', url: activeNodeArray }
    createNew({ node, store, client })
  }, [activeNodeArray, client, store])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Herkunft"
        title="neue Herkunft"
        onClick={add}
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(HerkunftAddButton)
