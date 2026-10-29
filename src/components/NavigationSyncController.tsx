import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { isEqual } from 'es-toolkit'
import { useLocation, useNavigate } from 'react-router'

import {
  activeNodeArrayAtom,
  setHistoryRev,
  setObjectName,
  setNavigate,
  setActiveNodeArray,
  setLastActiveNodeArray,
  addOpenNode,
} from '../store/index.ts'
import { getActiveNodeArrayFromPathname } from '../utils/getActiveNodeArrayFromPathname.ts'
import { splitHistoriesFromActiveNodeArray } from '../utils/splitHistoriesFromActiveNodeArray.ts'
import { splitObjectNameFromActiveNodeArray } from '../utils/splitObjectNameFromActiveNodeArray.ts'
import { breadcrumbsEnabled } from '../utils/breadcrumbsEnabled.ts'

// syncs activeNodeArray with browser navigation
export const NavigationSyncController = () => {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  const aNA = useAtomValue(activeNodeArrayAtom).slice()

  // enable navigating in store > set this as store value
  // (can't be passed when creating store yet)
  useEffect(() => {
    setNavigate(
      navigate as unknown as (to: string, options?: unknown) => void,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // when user clicks back or foward button, need to set lastActiveNodeArray
  useEffect(() => {
    window.onpopstate = () => {
      const urlWithHistory = getActiveNodeArrayFromPathname(pathname)
      const { activeNodeArray } = splitHistoriesFromActiveNodeArray(
        urlWithHistory as string[],
      )
      setLastActiveNodeArray(activeNodeArray)
    }
    // do not need to remove, see: https://stackoverflow.com/a/47997544/712005
  }, [pathname])

  // need to update activeNodeArray on every navigation
  useEffect(() => {
    if (pathname.startsWith('/Dokumentation')) return

    const urlWithHistory = getActiveNodeArrayFromPathname(pathname)
    const { activeNodeArray: activeNodeArrayFromUrl, historyRev } =
      splitHistoriesFromActiveNodeArray(urlWithHistory as string[])
    setHistoryRev(historyRev)
    // reset/set the object name unconditionally (like historyRev):
    // setActiveNodeArray below only runs when the node array changed,
    // which it does not when only the object name suffix appears/disappears
    const { activeNodeArray: activeNodeArray, objectName } =
      breadcrumbsEnabled
        ? splitObjectNameFromActiveNodeArray(activeNodeArrayFromUrl as string[])
        : { activeNodeArray: activeNodeArrayFromUrl, objectName: undefined }
    if (breadcrumbsEnabled) setObjectName(objectName)

    if (!isEqual(activeNodeArray, aNA)) {
      // when the url contains a histories suffix, do not navigate:
      // navigating from the stripped activeNodeArray would remove it
      setActiveNodeArray(activeNodeArray, !!historyRev)
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
