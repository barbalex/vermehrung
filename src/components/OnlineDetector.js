import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Detector } from 'react-detect-offline'

import { StoreContext } from '../models/reactUtils'

const OnlineDetector = () => {
  const { setOnline, online } = useContext(StoreContext)

  return (
    <Detector
      render={({ online: ol }) => {
        if (online !== ol) setOnline(ol)

        return null
      }}
    />
  )
}

export default observer(OnlineDetector)
