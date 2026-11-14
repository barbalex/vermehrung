import { store, openNodesAtom } from '../../store/index.ts'

// url segments can contain '/' - a plain join would be ambiguous, so
// join with a separator that cannot appear in ids/segments
const keyOf = (url: string[]) => url.join('\u0000')

// rebuilt once per openNodes change, then O(1) per row render
let cachedOpenNodes: string[][] | null = null
let cachedKeys: Set<string> | null = null

export const isNodeOpen = ({ url }: { url: string[] | undefined }) => {
  if (!url) return false
  const openNodes = store.get(openNodesAtom)
  if (openNodes !== cachedOpenNodes) {
    cachedKeys = new Set(openNodes.map((n: string[]) => keyOf(n)))
    cachedOpenNodes = openNodes
  }
  return cachedKeys?.has(keyOf(url)) ?? false
}
