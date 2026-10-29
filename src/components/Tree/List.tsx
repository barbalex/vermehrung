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

  // Only scroll once on initial mount, not on every click
  const hasScrolledRef = useRef(false)

  useEffect(() => {
    if (!hasScrolledRef.current && nodeIndex > -1) {
      hasScrolledRef.current = true
      // when loading on a url, nodes are built after this list has mounted:
      // scroll the focused node into view as soon as it exists.
      // center: rows have dynamic heights, so the position is only estimated
      listRef.current?.scrollToRow({
        index: nodeIndex,
        align: 'center',
      })
    }
  }, [nodeIndex, listRef])

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
