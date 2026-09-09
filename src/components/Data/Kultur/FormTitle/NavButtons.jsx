import { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import { of as $of } from 'rxjs'

import {
  activeNodeArrayAtom,
  removeOpenNode,
  setActiveNodeArray,
  store,
} from '../../../../store/index.js'
import ZaDownSvg from '../../../../svg/to_za_down.svg?react'
import AnLiDownSvg from '../../../../svg/to_anli_down.svg?react'
import AusLiDownSvg from '../../../../svg/to_ausli_down.svg?react'
import EvDownSvg from '../../../../svg/to_ev_down.svg?react'
import TkDownSvg from '../../../../svg/to_tk_down.svg?react'
import UpSvg from '../../../../svg/to_up.svg?react'

export const KulturNavButtons = ({ row }) => {
  const onClickToKulturen = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  const onClickToZaehlungen = () =>
    setActiveNodeArray([...store.get(activeNodeArrayAtom), 'Zaehlungen'])

  const onClickToAnLieferungen = () =>
    setActiveNodeArray([...store.get(activeNodeArrayAtom), 'An-Lieferungen'])

  const onClickToAusLieferungen = () =>
    setActiveNodeArray([...store.get(activeNodeArrayAtom), 'Aus-Lieferungen'])

  const onClickToEvents = () =>
    setActiveNodeArray([...store.get(activeNodeArrayAtom), 'Events'])

  const onClickToTks = () =>
    setActiveNodeArray([...store.get(activeNodeArrayAtom), 'Teilkulturen'])

  const [dataState, setDataState] = useState({ kulturOption: undefined })
  const { kulturOption } = dataState

  useEffect(() => {
    const kOObservable = row.kultur_option
      ? row.kultur_option.observe()
      : $of({})
    const subscription = kOObservable.subscribe((kulturOption) =>
      setDataState({ kulturOption }),
    )

    return () => subscription?.unsubscribe?.()
  }, [row.kultur_option])

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
