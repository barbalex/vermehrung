import { atom } from 'jotai'

// state of the open tree context menu; null when closed.
// entries are built by the row when the menu is opened:
// { type: 'item', label, onClick?, className? } or
// { type: 'subtitle', label, className? }
export const treeContextMenuAtom = atom(null)

// ms a left mouse button / touch has to be held down on a row to open the menu
export const holdToDisplayMs = 1000

// increments per opening; used to remount the menu (resetting state)
let menuOpenCount = 0
export const nextMenuOpenId = () => ++menuOpenCount
