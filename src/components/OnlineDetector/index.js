import React from 'react'
import { observer } from 'mobx-react-lite'
import { Detector } from 'react-detect-offline'

import Setter from './Setter'

const OnlineDetector = () => {
  return <Detector render={({ online }) => <Setter ol={online} />} />
}

export default observer(OnlineDetector)
