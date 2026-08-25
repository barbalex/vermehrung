import IconButton from '@mui/material/IconButton'

import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../../store/index.js'
import UpSvg from '../../../../svg/to_up.svg?react'
import LiDownSvg from '../../../../svg/to_li_down.svg?react'

export const SammelLieferungNavButtons = () => {
  const onClickUp = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  const onClickToLieferungen = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    setActiveNodeArray([...activeNodeArray, 'Lieferungen'])
  }

  return (
    <>
      <IconButton title="Zur Liste" onClick={onClickUp} size="large">
        <UpSvg />
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
