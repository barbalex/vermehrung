// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../models/reactUtils'

const OnlineSetter = ({ ol }) => {
  const { setOnline, online } = useContext(StoreContext)

  useEffect(() => {
    if (online !== ol) setOnline(ol)
  }, [ol, online, setOnline])

  return null
}

export default observer(OnlineSetter)
