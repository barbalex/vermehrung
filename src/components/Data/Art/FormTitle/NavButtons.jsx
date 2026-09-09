import IconButton from '@mui/material/IconButton'

import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../../store/index.js'
import UpSvg from '../../../../svg/to_up.svg?react'
import SaDownSvg from '../../../../svg/to_sa_down.svg?react'
import KuDownSvg from '../../../../svg/to_ku_down.svg?react'
import HeDownSvg from '../../../../svg/to_he_down.svg?react'

export const NavButtons = () => {
  const onClickUp = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }
  const onClickToHerkuenfte = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    setActiveNodeArray([...activeNodeArray, 'Herkuenfte'])
  }
  const onClickToSammlungen = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    setActiveNodeArray([...activeNodeArray, 'Sammlungen'])
  }
  const onClickToKulturen = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    setActiveNodeArray([...activeNodeArray, 'Kulturen'])
  }

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
