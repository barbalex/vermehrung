import { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'

import StoreContext from '../../storeContext'
import activeNodeArrayFromPathname from '../../utils/activeNodeArrayFromPathname'
import openNodesFromActiveNodeArray from '../../utils/openNodesFromActiveNodeArray'

const OpenNodesSetter = () => {
  const { pathname } = useLocation()
  const store = useContext(StoreContext)
  const { setLastActiveNodeArray, setOpenNodes } = store.tree

  const activeNodeArray = activeNodeArrayFromPathname(pathname)

  // on first render set openNodes
  // DO NOT add activeNodeArray to useEffet's dependency array or
  // it will not be possible to open multiple branches in tree
  // as openNodes is overwritten every time activeNodeArray changes
  useEffect(() => {
    setOpenNodes(openNodesFromActiveNodeArray(activeNodeArray))
    // set last touched node in case project is directly opened on it
    setLastActiveNodeArray(activeNodeArray)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

export default observer(OpenNodesSetter)
