import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'

import StoreContext from '../../../../storeContext'
import UpSvg from '../../../../svg/to_up.inline.svg'
import SaDownSvg from '../../../../svg/to_sa_down.inline.svg'
import GaDownSvg from '../../../../svg/to_ga_down.inline.svg'
import LiDownSvg from '../../../../svg/to_li_down.inline.svg'

const PersonFormTitleNavButtons = () => {
  const store = useContext(StoreContext)
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
  const onClickToSammlungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Sammlungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToGaerten = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Gaerten']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToLieferungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Lieferungen']),
    [activeNodeArray, setActiveNodeArray],
  )

  return <>
    <IconButton title="Zur Liste" onClick={onClickUp} size="large">
      <UpSvg />
    </IconButton>
    <IconButton title="Zu den Sammlungen" onClick={onClickToSammlungen} size="large">
      <SaDownSvg />
    </IconButton>
    <IconButton title="Zu den Gärten" onClick={onClickToGaerten} size="large">
      <GaDownSvg />
    </IconButton>
    <IconButton title="Zu den Lieferungen" onClick={onClickToLieferungen} size="large">
      <LiDownSvg />
    </IconButton>
  </>;
}

export default observer(PersonFormTitleNavButtons)
