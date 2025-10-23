import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import UpSvg from '../../../../svg/to_up.svg?react'
import SaDownSvg from '../../../../svg/to_sa_down.svg?react'
import KuDownSvg from '../../../../svg/to_ku_down.svg?react'
import HeDownSvg from '../../../../svg/to_he_down.svg?react'

export const NavButtons = observer(() => {
  const store = useContext(MobxStoreContext)
  const { tree } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = tree

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }
  const onClickToHerkuenfte = () =>
    setActiveNodeArray([...activeNodeArray, 'Herkuenfte'])
  const onClickToSammlungen = () =>
    setActiveNodeArray([...activeNodeArray, 'Sammlungen'])
  const onClickToKulturen = () =>
    setActiveNodeArray([...activeNodeArray, 'Kulturen'])

  return (
    <>
      <IconButton
        title="Zur Liste"
        onClick={onClickUp}
        size="large"
      >
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
})
