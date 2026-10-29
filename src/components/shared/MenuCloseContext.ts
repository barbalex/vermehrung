import { createContext } from 'react'

// Lets menu items close the surrounding menu after acting (e.g. navigating).
// Items opening a nested menu must not call it - it is opt-in.
// The noop default keeps items usable outside a menu.
export const MenuCloseContext = createContext<() => void>(() => undefined)
