/**
 * This component only loads the data
 * Reason: apollo used to return no data while refreshing
 * This was bad for the tree. Very hard to build a good user experience.
 * So the data was passed as props to the Tree component.
 * Which can decide not to update nodes if the query is loading
 * but rather use the previous value
 */
import React from 'react'
import { observer } from 'mobx-react-lite'

import Tree from './Tree'

const TreeContainer = () => {
  return <Tree />
}

export default observer(TreeContainer)
