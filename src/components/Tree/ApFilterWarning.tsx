import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import { IoMdClose } from 'react-icons/io'

import {
  apFilterAtom,
  artIdInActiveNodeArrayAtom,
  dbAtom,
} from '../../store/index.ts'

import styles from './ApFilterWarning.module.css'

export const ApFilterWarning = () => {
  const apFilter = useAtomValue(apFilterAtom)
  const db = useAtomValue(dbAtom)
  const artIdInActiveNodeArray = useAtomValue(artIdInActiveNodeArrayAtom)

  const [artIsNoAp, setArtIsNoAp] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!apFilter || !artIdInActiveNodeArray) {
      setArtIsNoAp(false)
      return
    }
    const subscription = db
      ?.get<import('../../dbModel.ts').Art>('art')
      .findAndObserve(artIdInActiveNodeArray)
      .subscribe((art) => setArtIsNoAp(art?.apflora_ap === false))

    return () => subscription?.unsubscribe?.()
  }, [apFilter, artIdInActiveNodeArray, db])

  // a newly opened art is a new situation: show the warning again
  useEffect(() => {
    setDismissed(false)
  }, [artIdInActiveNodeArray])

  if (!artIsNoAp || dismissed) return null

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        AP-Filter aktiv: Die geöffnete Art ist keine AP-Art und wird nur
        angezeigt, weil sie direkt geöffnet wurde.
      </div>
      <IconButton
        aria-label="Hinweis schliessen"
        title="Hinweis schliessen"
        onClick={() => setDismissed(true)}
        size="small"
      >
        <IoMdClose />
      </IconButton>
    </div>
  )
}
