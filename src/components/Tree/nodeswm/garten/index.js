import isEqual from 'lodash/isEqual'
import { first as first$ } from 'rxjs/operators'

const gartenNodes = async ({ store, gartens }) => {
  const { showGarten, visibleOpenNodes } = store.tree
  if (!showGarten) return []
  // only show if parent node exists
  if (!visibleOpenNodes.some((node) => isEqual(['Gaerten'], node))) return []

  const nodes = await Promise.all(
    gartens.map(async (n) => {
      const label = await n.label.pipe(first$()).toPromise()

      return {
        nodeType: 'table',
        menuTitle: 'Garten',
        table: 'garten',
        id: n.id,
        label,
        url: ['Gaerten', n.id],
        hasChildren: true,
      }
    }),
  )

  return nodes.map((n, index) => {
    n.sort = [4, index]
    return n
  })
}

export default gartenNodes
