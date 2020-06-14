import isEqual from 'lodash/isEqual'
//import { getSnapshot } from 'mobx-state-tree'

import artIdInUrl from '../../utils/artIdInUrl'
import herkunftIdInUrl from '../../utils/herkunftIdInUrl'
import gartenIdInUrl from '../../utils/gartenIdInUrl'
import kulturIdInUrl from '../../utils/kulturIdInUrl'
import anLieferungIdInUrl from '../../utils/anLieferungIdInUrl'
import ausLieferungIdInUrl from '../../utils/ausLieferungIdInUrl'
import teilkulturIdInUrl from '../../utils/teilkulturIdInUrl'
import personIdInUrl from '../../utils/personIdInUrl'
import sammelLieferungIdInUrl from '../../utils/sammelLieferungIdInUrl'
import sammlungIdInUrl from '../../utils/sammlungIdInUrl'
import kulturIdOfAnLieferungInUrl from '../../utils/kulturIdOfAnLieferungInUrl'
import kulturIdOfAusLieferungInUrl from '../../utils/kulturIdOfAusLieferungInUrl'
import zaehlungIdInUrl from '../../utils/zaehlungIdInUrl'

//export default (openNodes, url) => {
export default ({ store, url }) => {
  const { openNodes } = store.tree
  if (!url) return false
  //console.log('isNodeOpen', { openNodes: getSnapshot(openNodes), url })

  return openNodes.some((n) => isEqual(n, url))
}
