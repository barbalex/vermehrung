/**
 * based on:
 * https://hasura.io/docs/1.0/graphql/core/api-reference/health.html
 */
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'

import {
  onlineAtom,
  shortTermOnlineAtom,
  setOnline,
  setShortTermOnline,
} from '../store/index.js'
import { isOnline } from '../utils/isOnline.js'

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
