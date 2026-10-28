import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAtomValue, useSetAtom } from 'jotai'

import { treeContextMenuAtom } from './treeContextMenuAtom.ts'

import styles from './TreeContextMenu.module.css'

// mounted fresh for every menu opened (key={menuState.id}), so selection
// state resets automatically
import type { ContextMenuState } from './treeContextMenuAtom.ts'

const OpenContextMenu = ({
  menuState,
  closeMenu,
}: {
  menuState: ContextMenuState
  closeMenu: () => void
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const selectableEntries = menuState.entries.filter(
    (entry) => entry.type === 'item',
  )

  // place the menu at the pointer before paint, flipping at the
  // viewport edges; hidden until placed, then faded in via css
  useLayoutEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const { x, y } = menuState
    const { innerWidth, innerHeight } = window
    const rect = menu.getBoundingClientRect()
    let top = y
    let left = x
    if (y + rect.height > innerHeight) {
      top -= rect.height
    }
    if (x + rect.width > innerWidth) {
      left -= rect.width
    }
    if (top < 0) {
      top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0
    }
    if (left < 0) {
      left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0
    }
    menu.style.top = `${top}px`
    menu.style.left = `${left}px`
    menu.style.visibility = 'visible'
    menu.style.opacity = '1'
  }, [menuState, selectableEntries.length])

  const activateEntry = (index: number) => {
    const entry = selectableEntries[index]
    closeMenu()
    // entries without onClick (explainer text) only closed the menu before
    entry?.onClick?.()
  }

  // hide on outside pointer down, any scroll, resize, context menu
  // elsewhere; keyboard navigation
  useEffect(() => {
    const menu = menuRef.current
    const onPointerDown = (e: PointerEvent) => {
      if (!menu?.contains(e.target as Node | null)) closeMenu()
    }
    // rows stopPropagation on their contextmenu events, so this only
    // fires for context menus opened elsewhere on the page
    const onContextMenu = (e: MouseEvent) => {
      if (!menu?.contains(e.target as Node | null)) closeMenu()
    }
    const onScroll = () => closeMenu()
    const onResize = () => closeMenu()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) =>
          selectableEntries.length === 0
            ? -1
            : (i + 1) % selectableEntries.length,
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) =>
          selectableEntries.length === 0
            ? -1
            : (i <= 0 ? selectableEntries.length : i) - 1,
        )
      } else if (e.key === 'Enter') {
        e.preventDefault()
        // like the former implementation: Enter without selection closes
        if (selectedIndex === -1) {
          closeMenu()
        } else {
          activateEntry(selectedIndex)
        }
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    // capture: also catch scrolls of elements like the tree container
    document.addEventListener('scroll', onScroll, { capture: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('contextmenu', onContextMenu)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('scroll', onScroll, { capture: true })
      window.removeEventListener('resize', onResize)
      document.removeEventListener('contextmenu', onContextMenu)
      document.removeEventListener('keydown', onKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectableEntries, selectedIndex, closeMenu])

  // subtitles are not selectable; items know their index among the items
  let selectableIndex = -1

  return createPortal(
    <nav
      role="menu"
      tabIndex={-1}
      ref={menuRef}
      className={styles.menu}
      style={{ position: 'fixed', visibility: 'hidden', opacity: 0 }}
      onContextMenu={(e) => {
        e.preventDefault()
        closeMenu()
      }}
    >
      <div className={styles.title}>{menuState.title}</div>
      {menuState.entries.map((entry, index: number) => {
        if (entry.type === 'subtitle') {
          return (
            <div
              key={index}
              className={`${styles.subtitle} ${entry.className ?? ''}`}
            >
              {entry.label}
            </div>
          )
        }
        selectableIndex++
        const itemIndex = selectableIndex
        return (
          <div
            key={index}
            role="menuitem"
            tabIndex={-1}
            className={
              itemIndex === selectedIndex
                ? `${styles.item} ${styles.itemSelected} ${entry.className ?? ''}`
                : `${styles.item} ${entry.className ?? ''}`
            }
            onClick={() => activateEntry(itemIndex)}
            onMouseEnter={() => setSelectedIndex(itemIndex)}
          >
            {entry.label}
          </div>
        )
      })}
    </nav>,
    document.body,
  )
}

/**
 * single context menu for the nav tree, replacing the vendored
 * react-contextmenu library. Opened via treeContextMenuAtom;
 * the rows build the menu entries when opening.
 */
export const TreeContextMenu = () => {
  const menuState = useAtomValue(treeContextMenuAtom)
  const closeMenu = useSetAtom(treeContextMenuAtom)

  return menuState ? (
    <OpenContextMenu
      key={menuState.id}
      menuState={menuState}
      closeMenu={() => closeMenu(null)}
    />
  ) : null
}
