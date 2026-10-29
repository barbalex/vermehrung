import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { of as $of } from 'rxjs'

import { dbAtom } from '../../../../../store/index.ts'
import { constants } from '../../../../../utils/constants.ts'

import styles from './Menu.module.css'

export const TeilkulturSettingsMenu = ({
  anchorEl,
  setAnchorEl,
  kulturId,
}: {
  anchorEl: HTMLElement | null | undefined
  setAnchorEl: (el: HTMLElement | null) => void
  kulturId?: string
}) => {
  const db = useAtomValue(dbAtom)

  const [dataState, setDataState] = useState<{
    kulturOption: import('../../../../../dbModel.ts').KulturOption | undefined
  }>({ kulturOption: undefined })
  const { kulturOption } = dataState
  const { tk_bemerkungen } = (kulturOption ?? {}) as unknown as Record<string, unknown>

  useEffect(() => {
    const kOObservable = kulturId
      ? db?.get('kultur_option').findAndObserve(kulturId ?? '')
      : $of({})
    const subscription = (kOObservable as unknown as import('rxjs').Observable<import('../../../../../dbModel.ts').KulturOption | undefined>)?.subscribe((kulturOption) =>
      setDataState({ kulturOption }),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, kulturId])

  const saveToDb = async (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    const field = event.target.name
    const value = event.target.value === 'false'
    kulturOption?.edit({ field, value })
  }

  const openSettingsDocs = () => {
    setAnchorEl(null)
    const url = `${constants?.getAppUri()}/Dokumentation/felder-blenden`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }

  const onClose = () => setAnchorEl(null)

  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <div className={styles.titleRow}>
        <div className={styles.title}>Felder für Teilkulturen wählen:</div>
        <div>
          <IconButton
            aria-label="Anleitung öffnen"
            title="Anleitung öffnen"
            onClick={openSettingsDocs}
            size="large"
          >
            <IoMdInformationCircleOutline />
          </IconButton>
        </div>
      </div>
      <MenuItem>
        <FormControlLabel
          value={tk_bemerkungen === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!tk_bemerkungen}
              onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
              name="tk_bemerkungen"
            />
          }
          label="Bemerkungen"
          labelPlacement="end"
        />
      </MenuItem>
      <div className={styles.info}>
        Zwingende Felder sind nicht aufgelistet.
        <br />
        Die Wahl gilt (nur) für diese Kultur.
      </div>
    </Menu>
  )
}
