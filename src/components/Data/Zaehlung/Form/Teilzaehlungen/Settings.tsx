import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { FaCog } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { of as $of } from 'rxjs'

import { dbAtom } from '../../../../../store/index.ts'
import { constants } from '../../../../../utils/constants.ts'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'

import styles from './Settings.module.css'

export const TeilzaehlungenSettings = ({
  kulturId,
}: {
  kulturId?: string
}) => {
  const db = useAtomValue(dbAtom)

  const [dataState, setDataState] = useState<{
    kulturOption: Record<string, unknown> | undefined
  }>({ kulturOption: undefined })
  useEffect(() => {
    const kulturOptionObservable = kulturId
      ? db
          ?.get('kultur_option')
          .findAndObserve(kulturId ?? '')
      : $of({})
    const subscription = (
      kulturOptionObservable as unknown as import('rxjs').Observable<
        Record<string, unknown> | undefined
      >
    )?.subscribe(
      async (kulturOption) => {
        setDataState({ kulturOption })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, kulturId])
  const { kulturOption } = dataState

  const {
    tz_teilkultur_id,
    tz_andere_menge,
    tz_auspflanzbereit_beschreibung,
    tz_bemerkungen,
  } = kulturOption ?? {}

  const saveToDb = (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    const field = event.target.name
    const value = event.target.value === 'false'
    ;(kulturOption as unknown as {
      edit?: (args: { field?: string; value?: unknown }) => void
    })?.edit?.({ field, value })
  }

  const openSettingsDocs = () => {
    setAnchorEl(null)
    const url = `${constants?.getAppUri()}/Dokumentation/felder-blenden`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }

  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined | null>(null)
  const onClose = () => setAnchorEl(null)
  const onClickConfig = (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => setAnchorEl(event.currentTarget)

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Felder wählen"
        aria-owns={anchorEl ? 'long-menu' : undefined}
        aria-haspopup="true"
        title="Felder wählen"
        onClick={onClickConfig as unknown as import('react').MouseEventHandler<HTMLElement>}
        size="large"
      >
        <FaCog />
      </IconButton>
      {
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          <div className={styles.titleRow}>
            <div className={styles.title}>
              Felder für Teil-Zählungen wählen:
            </div>
            <div>
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openSettingsDocs as unknown as import('react').MouseEventHandler<HTMLElement>}
                size="large"
              >
                <IoMdInformationCircleOutline />
              </IconButton>
            </div>
          </div>
          <MenuItem>
            <FormControlLabel
              value={tz_teilkultur_id === true ? 'true' : 'false'}
              control={
                <Checkbox
                  color="primary"
                  checked={!!tz_teilkultur_id}
                  onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
                  name="tz_teilkultur_id"
                />
              }
              label="Teilkultur"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={tz_andere_menge === true ? 'true' : 'false'}
              control={
                <Checkbox
                  color="primary"
                  checked={!!tz_andere_menge}
                  onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
                  name="tz_andere_menge"
                />
              }
              label={`Andere Menge (z.B. "3 Zwiebeln")`}
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={
                tz_auspflanzbereit_beschreibung === true ? 'true' : 'false'
              }
              control={
                <Checkbox
                  color="primary"
                  checked={!!tz_auspflanzbereit_beschreibung}
                  onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
                  name="tz_auspflanzbereit_beschreibung"
                />
              }
              label="Beschreibung auspflanzbereite Pflanzen (z.B. Topfgrösse)"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={tz_bemerkungen === true ? 'true' : 'false'}
              control={
                <Checkbox
                  color="primary"
                  checked={!!tz_bemerkungen}
                  onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
                  name="tz_bemerkungen"
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
      }
    </ErrorBoundary>
  )
}
