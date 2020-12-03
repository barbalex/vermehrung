import isEqual from 'lodash/isEqual'
import { first as first$ } from 'rxjs/operators'

const sammlungNodes = async ({ store, sammlungs }) => {
  const { showSammlung, visibleOpenNodes } = store.tree

  if (!showSammlung) return []
  // only show if parent node exists
  if (!visibleOpenNodes.some((node) => isEqual(['Sammlungen'], node))) return []

  const nodes = await Promise.all(
    sammlungs.map(async (n) => {
      const label = await n.label.pipe(first$()).toPromise()

      return {
        nodeType: 'table',
        menuTitle: 'Sammlung',
        table: 'sammlung',
        id: n.id,
        label,
        url: ['Sammlungen', n.id],
        hasChildren: true,
      }
    }),
  )

  return nodes.map((n, index) => {
    n.sort = [3, index]
    return n
  })
}

export default sammlungNodes
