/**
 * inspired by:
 * https://github.com/chrisbolin/react-detect-offline/blob/master/src/index.js
 */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../models/reactUtils'
import isOnline from '../utils/isOnline'

const pollInterval = 5000

const ApiDetector = () => {
  const store = useContext(StoreContext)
  const { online, setOnline } = store

  useEffect(() => {
    const pollingId = setInterval(() => {
      isOnline().then((nowOnline) => {
        if (online !== nowOnline) {
          setOnline(nowOnline)
        }
      })
    }, pollInterval)
    return () => {
      clearInterval(pollingId)
    }
  }, [online, setOnline])

  return null
}

export default observer(ApiDetector)
