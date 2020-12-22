/**
 * based on:
 * https://hasura.io/docs/1.0/graphql/core/api-reference/health.html
 */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import StoreContext from '../storeContext'
import isOnline from '../utils/isOnline'

const pollInterval = 5000

const ApiDetector = () => {
  const store = useContext(StoreContext)
  const { online, setOnline, shortTermOnline, setShortTermOnline } = store

  useEffect(() => {
    const pollingId = setInterval(() => {
      isOnline().then((nowOnline) => {
        if (online !== nowOnline) {
          setOnline(nowOnline)
        }
        if (shortTermOnline !== nowOnline) {
          setShortTermOnline(nowOnline)
        }
      })
    }, pollInterval)

    return () => {
      clearInterval(pollingId)
    }
  }, [online, setOnline, setShortTermOnline, shortTermOnline])

  return null
}

export default observer(ApiDetector)
