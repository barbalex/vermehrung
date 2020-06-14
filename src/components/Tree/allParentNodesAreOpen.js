import isNodeOpen from './isNodeOpen'

export default ({ store, url: urlPassed }) => {
  let parentUrls = []
  const node = [...urlPassed]
  for (let i = 1; i < node.length; i++) {
    parentUrls.push(node.slice(0, i))
  }
  // remove 'Projekte' as that is not contained in openNodes
  parentUrls = parentUrls.filter(
    (n) => !(n.length === 1 && n[0] === 'Projekte'),
  )
  if (parentUrls.length === 0) return true
  return parentUrls.every((url) => isNodeOpen({ store, url }))
}
