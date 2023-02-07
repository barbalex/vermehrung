import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'

import StoreContext from '../../../../storeContext'
import UpSvg from '../../../../svg/to_up.inline.svg'
import SaDownSvg from '../../../../svg/to_sa_down.inline.svg'
import KuDownSvg from '../../../../svg/to_ku_down.inline.svg'
import HeDownSvg from '../../../../svg/to_he_down.inline.svg'

const ArtNavButtons = () => {
  const store = useContext(StoreContext)
  const { tree } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = tree

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
  const onClickToHerkuenfte = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Herkuenfte']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToSammlungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Sammlungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToKulturen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Kulturen']),
    [activeNodeArray, setActiveNodeArray],
  )

  return (
    <>
      <IconButton title="Zur Liste" onClick={onClickUp} size="large">
        <UpSvg />
      </IconButton>
      <IconButton
        title="Zu den Herkünften dieser Art"
        onClick={onClickToHerkuenfte}
        size="large"
      >
        <HeDownSvg />
      </IconButton>
      <IconButton
        title="Zu den Sammlungen dieser Art"
        onClick={onClickToSammlungen}
        size="large"
      >
        <SaDownSvg />
      </IconButton>
      <IconButton
        title="Zu den Kulturen dieser Art"
        onClick={onClickToKulturen}
        size="large"
      >
        <KuDownSvg />
      </IconButton>
    </>
  )
}

export default observer(ArtNavButtons)
