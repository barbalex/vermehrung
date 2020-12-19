import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'

import StoreContext from '../../../../storeContext'
import UpSvg from '../../../../svg/to_up.inline.svg'
import LiDownSvg from '../../../../svg/to_li_down.inline.svg'

const SlNavButtons = () => {
  const store = useContext(StoreContext)

  const { activeNodeArray, setActiveNodeArray } = store.tree

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToLieferungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Lieferungen']),
    [activeNodeArray, setActiveNodeArray],
  )

  return (
    <>
      <IconButton title="Zur Liste" onClick={onClickUp}>
        <UpSvg />
      </IconButton>
      <IconButton title="Zu den Lieferungen" onClick={onClickToLieferungen}>
        <LiDownSvg />
      </IconButton>
    </>
  )
}

export default observer(SlNavButtons)
