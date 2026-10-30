/**
 * needed to place list in own component
 * because ref did not work when this was included in it's parent
 * listRef.current was always null
 */
import { useEffect, useRef } from 'react'
import { useAtomValue } from 'jotai'
import { isEqual } from 'es-toolkit'
import { List, useDynamicRowHeight, useListRef } from 'react-window'

import {
  activeNodeArrayAtom,
  lastActiveNodeArrayAtom,
} from '../../store/index.ts'
import { TreeRow } from './Row.tsx'

import type { TreeNode } from './nodes/index.ts'

export const TreeList = ({
  nodes,
  userRole,
}: {
  nodes: TreeNode[]
  userRole?: string | null
}) => {
  const aNA = useAtomValue(activeNodeArrayAtom)
  const lastActiveNodeArray = useAtomValue(lastActiveNodeArrayAtom)

  const listRef = useListRef(null)
  // tree rows wrap (white-space: normal on the label span), so heights are
  // measured per row; 21px is the single-line row height
  // (contain-intrinsic-size in Row.module.css)
  const dynamicRowHeight = useDynamicRowHeight({
    defaultRowHeight: 21,
  })

  // when loading on url, lastActiveNodeArray may not be set
  const urlToFocus = lastActiveNodeArray.length ? lastActiveNodeArray : aNA
  const nodeIndex = nodes.findIndex((node) => isEqual(node.url, urlToFocus))

  // center the focused node once, on initial mount. When loading on a
  // url, nodes are built after this list has mounted: the effect waits
  // for the row to exist. Dynamic row heights make the position an
  // estimate, hence align: 'center'
  const hasScrolledRef = useRef(false)

  useEffect(() => {
    if (!hasScrolledRef.current && nodeIndex > -1) {
      hasScrolledRef.current = true
      listRef.current?.scrollToRow({
        index: nodeIndex,
        align: 'center',
      })
    }
  }, [nodeIndex, listRef])

  // follow later navigation (e.g. clicking a way-down element in a list
  // view): scroll the active node's row into view once it exists. align:
  // 'auto' scrolls only when the row is not visible, so clicking around
  // inside the tree itself does not jump. nodes is a dep because the row
  // appears only after the newly opened ancestors have loaded; the
  // per-navigation latch keeps later tree rebuilds from snapping a
  // manually scrolled position back to the active row
  const lastScrolledUrlRef = useRef<string | null>(null)

  useEffect(() => {
    if (!hasScrolledRef.current) return
    const url = aNA.join('/')
    if (lastScrolledUrlRef.current === url) return
    const index = nodes.findIndex((node) => isEqual(node.url, aNA))
    if (index === -1) return
    lastScrolledUrlRef.current = url
    listRef.current?.scrollToRow({ index, align: 'auto' })
  }, [aNA, nodes, listRef])

  return (
    <List
      listRef={listRef}
      style={{ marginTop: 5, scrollbarWidth: 'thin' }}
      rowComponent={TreeRow}
      rowCount={nodes.length}
      rowHeight={dynamicRowHeight}
      rowProps={{ nodes, userRole }}
    />
  )
}
