/**
 * see: https://stackoverflow.com/a/11744120/712005
 */
const getWindowSize = () => {
  const w = window
  const d = document
  const e = d.documentElement
  const g = d.getElementsByTagName('body')[0]
  const width = w.innerWidth || e.clientWidth || g.clientWidth
  const height = w.innerHeight || e.clientHeight || g.clientHeight

  return { width, height }
}

export default getWindowSize
