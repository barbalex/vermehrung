import isEqual from 'lodash/isEqual'
import { first as first$ } from 'rxjs/operators'

const artNodes = async ({ store, arts }) => {
  const { showArt, visibleOpenNodes } = store.tree
  console.log('artNodes', { showArt, visibleOpenNodes })
  if (!showArt) return []
  // only show if parent node exists
  if (!visibleOpenNodes.some((node) => isEqual(['Arten'], node))) return []

  const nodes = await Promise.all(
    arts.map(async (n) => {
      const label = await n.label.pipe(first$()).toPromise()

      return {
        nodeType: 'table',
        menuTitle: 'Art',
        table: 'art',
        id: n.id,
        label,
        url: ['Arten', n.id],
        hasChildren: true,
      }
    }),
  )

  return nodes.map((n, index) => {
    n.sort = [1, index]
    return n
  })
}

export default artNodes
