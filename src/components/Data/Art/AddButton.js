import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'

const ArtAddButton = () => {
  const store = useContext(StoreContext)
  const { insertArtRev } = store
  const {
    activeNodeArray,
    setActiveNodeArray,
    addOpenNodes,
    refetch,
  } = store.tree

  const add = useCallback(() => {
    const id = insertArtRev()
    setTimeout(() => {
      // will be unnecessary once tree is converted to mst
      refetch()
      // update tree status
      const aNaPopped = activeNodeArray.slice(0, -1)
      const newActiveNodeArray = [...aNaPopped, id]
      setActiveNodeArray(newActiveNodeArray)
      addOpenNodes([newActiveNodeArray])
    })
  }, [activeNodeArray, addOpenNodes, insertArtRev, refetch, setActiveNodeArray])

  return (
    <ErrorBoundary>
      <IconButton aria-label="neue Art" title="neue Art" onClick={add}>
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(ArtAddButton)
