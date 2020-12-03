import isEqual from 'lodash/isEqual'
import { first as first$ } from 'rxjs/operators'

const kulturNodes = async ({ store, kulturs }) => {
  const { showKultur, visibleOpenNodes } = store.tree
  if (!showKultur) return []
  // only show if parent node exists
  if (!visibleOpenNodes.some((node) => isEqual(['Kulturen'], node))) return []

  const nodes = await Promise.all(
    kulturs.map(async (n) => {
      const label = await n.label.pipe(first$()).toPromise()

      return {
        nodeType: 'table',
        menuTitle: 'Kultur',
        table: 'kultur',
        id: n.id,
        label,
        url: ['Kulturen', n.id],
        hasChildren: true,
      }
    }),
  )

  return nodes.map((n, index) => {
    n.sort = [5, index]
    return n
  })
}

export default kulturNodes
