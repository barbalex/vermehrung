import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../models/reactUtils'
import ZaDownSvg from '../../../svg/to_za_down.inline.svg'
import AnLiDownSvg from '../../../svg/to_anli_down.inline.svg'
import AusLiDownSvg from '../../../svg/to_ausli_down.inline.svg'
import EvDownSvg from '../../../svg/to_ev_down.inline.svg'
import TkDownSvg from '../../../svg/to_tk_down.inline.svg'
import UpSvg from '../../../svg/to_up.inline.svg'

const KulturNavButtons = ({ row }) => {
  const store = useContext(StoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const onClickToKulturen = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToZaehlungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Zaehlungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToAnLieferungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'An-Lieferungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToAusLieferungen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Aus-Lieferungen']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToEvents = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Events']),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToTks = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Teilkulturen']),
    [activeNodeArray, setActiveNodeArray],
  )

  return (
    <>
      <IconButton title="Zur Kultur-Liste" onClick={onClickToKulturen}>
        <UpSvg />
      </IconButton>
      {row?.kultur_option?.tk && (
        <IconButton title="Zu den Teilkulturen" onClick={onClickToTks}>
          <TkDownSvg />
        </IconButton>
      )}
      <IconButton title="Zu den Zählungen" onClick={onClickToZaehlungen}>
        <ZaDownSvg />
      </IconButton>
      <IconButton
        title="Zu den An-Lieferungen"
        onClick={onClickToAnLieferungen}
      >
        <AnLiDownSvg />
      </IconButton>
      <IconButton
        title="Zu den Aus-Lieferungen"
        onClick={onClickToAusLieferungen}
      >
        <AusLiDownSvg />
      </IconButton>
      <IconButton title="Zu den Events" onClick={onClickToEvents}>
        <EvDownSvg />
      </IconButton>
    </>
  )
}

export default observer(KulturNavButtons)
