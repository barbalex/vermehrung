import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { isEqual } from 'es-toolkit'
import { useLocation, useNavigate } from 'react-router'

import {
  activeNodeArrayAtom,
  setNavigate,
  setActiveNodeArray,
  setLastActiveNodeArray,
  addOpenNode,
} from '../store/index.js'
import { getActiveNodeArrayFromPathname } from '../utils/getActiveNodeArrayFromPathname.js'

// syncs activeNodeArray with browser navigation
export const NavigationSyncController = () => {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  const aNA = useAtomValue(activeNodeArrayAtom).slice()

  // enable navigating in store > set this as store value
  // (can't be passed when creating store yet)
  useEffect(() => {
    setNavigate(navigate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // when user clicks back or foward button, need to set lastActiveNodeArray
  useEffect(() => {
    window.onpopstate = () => {
      setLastActiveNodeArray(getActiveNodeArrayFromPathname(pathname))
    }
    // do not need to remove, see: https://stackoverflow.com/a/47997544/712005
  }, [pathname])

  // need to update activeNodeArray on every navigation
  useEffect(() => {
    if (pathname.startsWith('/Dokumentation')) return

    const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname(pathname)

    if (!isEqual(activeNodeArrayFromUrl, aNA)) {
      setActiveNodeArray(activeNodeArrayFromUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    // ensure activeNodeArray's node exist in tree
    addOpenNode(aNA)
    // ensure last activeNodeArray is known
    setLastActiveNodeArray(aNA)
  }, [aNA])

  return null
}
