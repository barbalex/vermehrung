/**
 * based on:
 * https://hasura.io/docs/1.0/graphql/core/api-reference/health.html
 */
 
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'

import {
  onlineAtom,
  shortTermOnlineAtom,
  setOnline,
  setShortTermOnline,
} from '../store/index.ts'
import { isOnline } from '../utils/isOnline.ts'

const pollInterval = 5000

export const ApiDetector = () => {
  const online = useAtomValue(onlineAtom)
  const shortTermOnline = useAtomValue(shortTermOnlineAtom)

  useEffect(() => {
    let isActive = true
    const pollingId = setInterval(() => {
      isOnline().then((nowOnline) => {
        if (!isActive) return

        if (online !== nowOnline) {
          setOnline(nowOnline)
        }
        if (shortTermOnline !== nowOnline) {
          setShortTermOnline(nowOnline)
        }
      })
    }, pollInterval)

    return () => {
      isActive = false
      clearInterval(pollingId)
    }
  }, [online, shortTermOnline])

  return null
}
