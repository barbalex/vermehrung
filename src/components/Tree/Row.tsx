import { useEffect, useRef, useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  MdAccountCircle as AccountIcon,
  MdChevronRight as ChevronRightIcon,
  MdExpandMore as ExpandMoreIcon,
  MdMoreHoriz as MoreHorizIcon,
} from 'react-icons/md'
import { of as $of } from 'rxjs'

import {
  dbAtom,
  activeNodeArrayAtom,
  showTreeInSingleColumnViewAtom,
  singleColumnViewAtom,
} from '../../store/index.ts'
import { isNodeInActiveNodePath } from './isNodeInActiveNodePath.ts'
import { isNodeOpen } from './isNodeOpen.ts'
import { someChildrenAreOpen } from './someChildrenAreOpen.ts'
import { someChildrenAreClosed } from './someChildrenAreClosed.ts'
import { openAllChildren } from './openAllChildren.ts'
import { closeAllChildren } from './closeAllChildren.ts'
import { toggleNode } from './toggleNode.ts'
import { toggleNodeSymbol } from './toggleNodeSymbol.ts'
import { createNew } from './createNew.ts'
import { deleteDataset } from './delete.ts'
import { signup } from '../../utils/signup.ts'
import { deleteAccount } from '../../utils/deleteAccount.ts'
import { setPassword } from '../../utils/setPassword.ts'
import {
  treeContextMenuAtom,
  holdToDisplayMs,
  nextMenuOpenId,
} from './treeContextMenuAtom.ts'

import styles from './Row.module.css'

import type { TreeNode } from './nodes/index.ts'

export const TreeRow = ({
  style: _style,
  node,
  nodes,
  userRole,
}: {
  style?: Record<string, unknown>
  node: TreeNode | undefined | null
  nodes: TreeNode[]
  userRole: string | null | undefined
}) => {
  const db = useAtomValue(dbAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const showTreeInSingleColumnView = useAtomValue(
    showTreeInSingleColumnViewAtom,
  )
  const singleColumnView = useAtomValue(singleColumnViewAtom)

  const isMobile = showTreeInSingleColumnView && singleColumnView
  let fontSize = node?.mono ? 15 : 16
  if (isMobile) fontSize = node?.mono ? 17 : 18

  const nodeIsInActiveNodePath = isNodeInActiveNodePath({
    node,
    activeNodeArray,
  })
  const nodeIsOpen = isNodeOpen({ url: node?.url })
  // build symbols
  let useSymbolIcon = true
  let useSymbolSpan = false
  let symbolIcon
  if (
    node?.hasChildren &&
    nodeIsOpen &&
    // If is folder: only open if childrenCount is > 0
    ((node?.nodeType === 'folder' && node?.childrenCount) ||
      node?.nodeType !== 'folder')
  ) {
    symbolIcon = 'expandMore'
  } else if (node?.hasChildren) {
    symbolIcon = 'chevronRight'
  } else if (node?.label === 'lade Daten...') {
    symbolIcon = 'moreHoriz'
  } else {
    useSymbolSpan = true
    useSymbolIcon = false
  }

  const [person, setPerson] = useState<import('../../dbModel.ts').Person | null>(null)
  useEffect(() => {
    if (!node) return
    const personObservable =
      node?.nodeType === 'table' && node.table === 'person' && node.url
        ? db
            ?.get('person')
            .findAndObserve(node.url.at(-1) ?? '')
        : $of<import('../../dbModel.ts').Person | null>(null)

    const subscription = (
      personObservable as unknown as import('rxjs').Observable<import('../../dbModel.ts').Person | null> | undefined
    )?.subscribe(
      (person) => setPerson(person),
    )

    return () => subscription?.unsubscribe?.()
    // deps are deliberate: the whole node object gets a new identity on
    // every tree rebuild, resubscribing on it would run constantly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, node?.nodeType, node?.table, node?.url])

  const existingNode = node as TreeNode | undefined
  const accountId = person?.account_id ?? null

  const onClickNode = () => {
    if (existingNode)
      toggleNode({
        nodes,
        node: existingNode,
      })
  }

  const onClickNodeSymbol = () => {
    if (existingNode) toggleNodeSymbol({ node: existingNode })
  }
  const onClickNeu = () => {
    if (existingNode) void createNew({ node: existingNode })
  }
  const onClickDelete = () => {
    if (existingNode) void deleteDataset({ node: existingNode })
  }
  const onClickSetPassword = () => setPassword({ person })
  const onClickDeleteAccout = () => deleteAccount({ person })
  const onClickSignup = () => signup({ person })
  const onClickOpenAllChildren = () => {
    if (existingNode) openAllChildren({ node: existingNode, nodes })
  }
  const onClickCloseAllChildren = () => {
    if (existingNode) closeAllChildren({ node: existingNode })
  }

  // open the context menu; suppress the browser menu like the former
  // trigger did, also for node types without a menu
  const openTreeContextMenu = useSetAtom(treeContextMenuAtom)
  const buildMenuEntries = () => {
    const entries = []
    if (node?.menuExplainerText) {
      entries.push({
        type: 'item',
        label: node.menuExplainerText,
        className: styles.menuExplainerItem,
      })
    }
    if (!(node?.hasMenu === false)) {
      entries.push({ type: 'item', label: 'neu', onClick: onClickNeu })
      if (node?.nodeType === 'table') {
        entries.push({
          type: 'item',
          label: 'löschen',
          onClick: onClickDelete,
        })
      }
      if (node?.nodeType === 'folder' && isNodeOpen({ url: node?.url })) {
        if (someChildrenAreOpen({ nodes, url: node?.url })) {
          entries.push({
            type: 'item',
            label: 'alle schliessen',
            onClick: onClickCloseAllChildren,
          })
        }
        if (someChildrenAreClosed({ nodes, url: node?.url })) {
          entries.push({
            type: 'item',
            label: 'alle öffnen',
            onClick: onClickOpenAllChildren,
          })
        }
      }
      if (
        node?.nodeType === 'table' &&
        node?.menuTitle === 'Person' &&
        userRole === 'manager'
      ) {
        if (!accountId) {
          entries.push({
            type: 'subtitle',
            label: 'Konto',
            className: styles.menuSubtitle,
          })
          entries.push({ type: 'item', label: 'neu', onClick: onClickSignup })
        } else {
          entries.push({
            type: 'subtitle',
            label: 'Konto',
            className: styles.menuSubtitle,
          })
          entries.push({
            type: 'item',
            label:
              'Email schicken, um ein Passwort zu setzen (Achtung: Ist nur ca. 2 Stunden gültig)',
            onClick: onClickSetPassword,
          })
          entries.push({
            type: 'item',
            label: 'löschen',
            onClick: onClickDeleteAccout,
          })
        }
      }
    }
    return entries
  }
  const openMenu = (x: number, y: number) => {
    if (!['table', 'folder'].includes(node?.nodeType ?? '')) return
    openTreeContextMenu({
      id: nextMenuOpenId(),
      x,
      y,
      title: node?.menuTitle ?? '',
      entries: buildMenuEntries() as import('./treeContextMenuAtom.ts').ContextMenuEntry[],
    })
  }

  // holding the left mouse button (or touch) opens the menu, as before
  const holdToDisplayTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const holdToDisplayStart = useRef<{ x: number; y: number } | null>(null)
  const clearHoldToDisplay = () => {
    if (holdToDisplayTimer.current) {
      clearTimeout(holdToDisplayTimer.current)
      holdToDisplayTimer.current = null
    }
    holdToDisplayStart.current = null
  }
  const onPointerDownNode = (e: {
    button: number
    clientX: number
    clientY: number
    preventDefault: () => void
  }) => {
    if (e.button !== 0) return
    const start = { x: e.clientX, y: e.clientY }
    holdToDisplayStart.current = start
    holdToDisplayTimer.current = setTimeout(() => {
      openMenu(start.x, start.y)
    }, holdToDisplayMs)
  }
  const onPointerMoveNode = (e: { clientX: number; clientY: number }) => {
    const start = holdToDisplayStart.current
    // moving away means dragging or scrolling, not holding still
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 9) {
      clearHoldToDisplay()
    }
  }
  const onContextMenuNode = (e: {
    clientX: number
    clientY: number
    preventDefault: () => void
    stopPropagation: () => void
  }) => {
    e.preventDefault()
    // keep the menu's own contextmenu listener from closing the new menu
    e.stopPropagation()
    clearHoldToDisplay()
    openMenu(e.clientX, e.clientY)
  }

  // for unknown reason this happens momentarily when new art is created
  if (!node?.url) return null

  const level =
    node?.url[0] === 'Projekte' ? node?.url?.length - 1 : node?.url?.length
  const inaktiv = node?.aktiv === false

  return (
    <div
      className={styles.nodeClass}
      style={{
        paddingLeft: level * 17 - 10,
        color: nodeIsInActiveNodePath
          ? '#D84315'
          : inaktiv
            ? 'rgba(0, 0, 0, 0.35)'
            : 'inherit',
      }}
      onContextMenu={onContextMenuNode}
      onPointerDown={onPointerDownNode}
      onPointerMove={onPointerMoveNode}
      onPointerUp={clearHoldToDisplay}
      onPointerCancel={clearHoldToDisplay}
      onPointerLeave={clearHoldToDisplay}
    >
      {useSymbolIcon && (
        <div
          className={styles.symbolDiv}
          onClick={onClickNodeSymbol}
          data-mobile={isMobile}
        >
          {symbolIcon === 'expandMore' && (
            <ExpandMoreIcon
              style={{
                marginLeft: nodeIsOpen ? -1 : 0,
                marginRight: nodeIsOpen ? -5 : 0,
                height: nodeIsOpen ? 30 : 22,
                width: nodeIsOpen ? 30 : 26,
                color: nodeIsInActiveNodePath ? '#D84315' : 'inherit',
              }}
              className={styles.expandMoreIcon}
            />
          )}
          {symbolIcon === 'chevronRight' && (
            <ChevronRightIcon className={styles.chevronRightIcon} />
          )}
          {symbolIcon === 'moreHoriz' && (
            <MoreHorizIcon
              style={{
                paddingLeft: nodeIsInActiveNodePath ? 1 : 2,
                height: nodeIsInActiveNodePath ? 26 : 22,
                color: nodeIsInActiveNodePath ? '#D84315' : 'inherit',
              }}
              className={styles.moreHorizIcon}
            />
          )}
        </div>
      )}
      {useSymbolSpan && (
        <span
          style={{
            paddingRight: isMobile ? 13 : 11,
            fontWeight: nodeIsInActiveNodePath ? 700 : 'inherit',
            marginTop: isMobile ? -2 : -1,
            fontSize: isMobile ? 32 : 28,
            width: isMobile ? 12 : 9,
          }}
          className={styles.symbolSpan}
        >
          {'-'}
        </span>
      )}
      <span
        onClick={onClickNode}
        style={{
          fontFamily: node?.mono
            ? 'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Mono", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Consolas", "Courier New", monospace'
            : 'system-ui',
          fontSize,
          fontWeight: nodeIsInActiveNodePath ? 700 : 'inherit',
        }}
        className={styles.textSpan}
      >
        {node?.label ?? '(kein Label)'}
      </span>
      {accountId && (
        <AccountIcon title="hat ein Konto" className={styles.accountIcon} />
      )}
    </div>
  )
}
