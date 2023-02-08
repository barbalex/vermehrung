import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'

import StoreContext from '../../../../storeContext'
import { ReactComponent as ZaDownSvg } from '../../../../svg/to_za_down.inline.svg'
import { ReactComponent as AnLiDownSvg } from '../../../../svg/to_anli_down.inline.svg'
import { ReactComponent as AusLiDownSvg } from '../../../../svg/to_ausli_down.inline.svg'
import { ReactComponent as EvDownSvg } from '../../../../svg/to_ev_down.inline.svg'
import { ReactComponent as TkDownSvg } from '../../../../svg/to_tk_down.inline.svg'
import { ReactComponent as UpSvg } from '../../../../svg/to_up.inline.svg'

const KulturNavButtons = ({ row }) => {
  const store = useContext(StoreContext)
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

  const onClickToKulturen = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
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

  const [dataState, setDataState] = useState({ kulturOption })
  useEffect(() => {
    const kOObservable = row.kultur_option.observe()
    const subscription = kOObservable.subscribe((kulturOption) =>
      setDataState({ kulturOption }),
    )

    return () => subscription?.unsubscribe?.()
  }, [row.kultur_option])
  const { kulturOption } = dataState

  return (
    <>
      <IconButton
        title="Zur Kultur-Liste"
        onClick={onClickToKulturen}
        size="large"
      >
        <UpSvg />
      </IconButton>
      {kulturOption?.tk && (
        <IconButton
          title="Zu den Teilkulturen"
          onClick={onClickToTks}
          size="large"
        >
          <TkDownSvg />
        </IconButton>
      )}
      <IconButton
        title="Zu den Zählungen"
        onClick={onClickToZaehlungen}
        size="large"
      >
        <ZaDownSvg />
      </IconButton>
      <IconButton
        title="Zu den An-Lieferungen"
        onClick={onClickToAnLieferungen}
        size="large"
      >
        <AnLiDownSvg />
      </IconButton>
      <IconButton
        title="Zu den Aus-Lieferungen"
        onClick={onClickToAusLieferungen}
        size="large"
      >
        <AusLiDownSvg />
      </IconButton>
      <IconButton title="Zu den Events" onClick={onClickToEvents} size="large">
        <EvDownSvg />
      </IconButton>
    </>
  )
}

export default observer(KulturNavButtons)
