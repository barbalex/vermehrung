/**
 * inspired by:
 * https://github.com/chrisbolin/react-detect-offline/blob/master/src/index.js
 */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import axios from 'axios'

import { StoreContext } from '../models/reactUtils'
import getConstants from '../utils/constants'

const constants = getConstants()

const config = {
  url: constants?.healthUri,
  timeout: 5000,
  interval: 5000,
}

const ping = async () => {
  let res
  try {
    res = await axios.get(config.url, { timeout: config.timeout })
  } catch (error) {
    // error can also be caused by timeout
    return false
  }
  if (res.status === 200) return true
  return false
}

const ApiDetector = () => {
  const store = useContext(StoreContext)
  const { online, setOnline } = store

  useEffect(() => {
    const pollingId = setInterval(() => {
      ping().then((nowOnline) => {
        if (online !== nowOnline) {
          setOnline(nowOnline)
        }
      })
    }, config.interval)
    return () => {
      clearInterval(pollingId)
    }
  }, [online, setOnline])

  return null
}

export default observer(ApiDetector)
