import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import UpSvg from '../../../../svg/to_up.svg?react'
import SaDownSvg from '../../../../svg/to_sa_down.svg?react'
import GaDownSvg from '../../../../svg/to_ga_down.svg?react'
import LiDownSvg from '../../../../svg/to_li_down.svg?react'

export const PersonFormTitleNavButtons = observer(() => {
  const store = useContext(MobxStoreContext)
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  const onClickToSammlungen = () =>
    setActiveNodeArray([...activeNodeArray, 'Sammlungen'])

  const onClickToGaerten = () =>
    setActiveNodeArray([...activeNodeArray, 'Gaerten'])

  const onClickToLieferungen = () =>
    setActiveNodeArray([...activeNodeArray, 'Lieferungen'])

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
        title="Zu den Sammlungen"
        onClick={onClickToSammlungen}
        size="large"
      >
        <SaDownSvg />
      </IconButton>
      <IconButton
        title="Zu den Gärten"
        onClick={onClickToGaerten}
        size="large"
      >
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
})
