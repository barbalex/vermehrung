import IconButton from '@mui/material/IconButton'

import {
  activeNodeArrayAtom,
  removeOpenNode,
  setActiveNodeArray,
  store,
} from '../../../../store/index.js'
import UpSvg from '../../../../svg/to_up.svg?react'
import SaDownSvg from '../../../../svg/to_sa_down.svg?react'
import GaDownSvg from '../../../../svg/to_ga_down.svg?react'
import LiDownSvg from '../../../../svg/to_li_down.svg?react'

export const PersonFormTitleNavButtons = () => {
  const onClickUp = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  const onClickToSammlungen = () =>
    setActiveNodeArray([...store.get(activeNodeArrayAtom), 'Sammlungen'])

  const onClickToGaerten = () =>
    setActiveNodeArray([...store.get(activeNodeArrayAtom), 'Gaerten'])

  const onClickToLieferungen = () =>
    setActiveNodeArray([...store.get(activeNodeArrayAtom), 'Lieferungen'])

  return (
    <>
      <IconButton title="Zur Liste" onClick={onClickUp} size="large">
        <UpSvg />
      </IconButton>
      <IconButton
        title="Zu den Sammlungen"
        onClick={onClickToSammlungen}
        size="large"
      >
        <SaDownSvg />
      </IconButton>
      <IconButton title="Zu den Gärten" onClick={onClickToGaerten} size="large">
        <GaDownSvg />
      </IconButton>
      <IconButton
        title="Zu den Lieferungen"
        onClick={onClickToLieferungen}
        size="large"
      >
        <LiDownSvg />
      </IconButton>
    </>
  )
}
