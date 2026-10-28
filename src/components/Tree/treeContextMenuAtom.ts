import { atom } from 'jotai'

export interface ContextMenuEntry {
  type: 'item' | 'subtitle'
  label: string
  onClick?: () => void
  className?: string
}

export interface ContextMenuState {
  id: number
  x: number
  y: number
  title?: string
  entries: ContextMenuEntry[]
}

// state of the open tree context menu; null when closed.
// entries are built by the row when the menu is opened:
// { type: 'item', label, onClick?, className? } or
// { type: 'subtitle', label, className? }
export const treeContextMenuAtom = atom<ContextMenuState | null>(null)

// ms a left mouse button / touch has to be held down on a row to open the menu
export const holdToDisplayMs = 1000

// increments per opening; used to remount the menu (resetting state)
let menuOpenCount = 0
export const nextMenuOpenId = () => ++menuOpenCount
