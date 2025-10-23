import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import UpSvg from '../../../../svg/to_up.svg?react'
import LiDownSvg from '../../../../svg/to_li_down.svg?react'

export const SammelLieferungNavButtons = observer(() => {
  const store = useContext(MobxStoreContext)

  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

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
        title="Zu den Lieferungen"
        onClick={onClickToLieferungen}
        size="large"
      >
        <LiDownSvg />
      </IconButton>
    </>
  )
})
