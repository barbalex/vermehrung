import { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router'

import { MobxStoreContext } from '../../mobxStoreContext.js'
import { getActiveNodeArrayFromPathname } from '../../utils/getActiveNodeArrayFromPathname.js'
import { openNodesFromActiveNodeArray } from '../../utils/openNodesFromActiveNodeArray.js'

export const OpenNodesSetter = observer(() => {
  const { pathname } = useLocation()
  const store = useContext(MobxStoreContext)
  const { setLastActiveNodeArray, setOpenNodes } = store.tree

  const activeNodeArray = getActiveNodeArrayFromPathname(pathname)

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
})
