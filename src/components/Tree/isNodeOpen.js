import isEqual from 'lodash/isEqual'
import { getSnapshot } from 'mobx-state-tree'

export default (openNodes, url) => {
  if (!url) return false
  if (!openNodes) return false
  if (!openNodes.some) return false
  //console.log('isNodeOpen', { openNodes: getSnapshot(openNodes), url })

  return openNodes.some((n) => isEqual(n, url))
}
