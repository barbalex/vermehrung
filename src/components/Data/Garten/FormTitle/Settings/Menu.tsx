import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { dbAtom, userAtom } from '../../../../../store/index.ts'
import { constants } from '../../../../../utils/constants.ts'

import styles from './Menu.module.css'

export const GartenSettingsMenu = ({
  anchorEl,
  setAnchorEl,
}: {
  anchorEl: HTMLElement | null | undefined
  setAnchorEl: (el: HTMLElement | null) => void
}) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)

  const [dataState, setDataState] = useState<Record<string, unknown>>({
    userPersonOption: undefined,
})
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          ?.get<import('../../../../../dbModel.ts').PersonOption>(
            'person_option',
          )
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns([
            'ga_strasse',
            'ga_plz',
            'ga_ort',
            'ga_geom_point',
            'ga_lat_lng',
            'ga_aktiv',
            'ga_bemerkungen',
          ])
      : $of({})
    const combinedObservables = combineLatest([userPersonOptionsObservable])
    const subscription = (
      combinedObservables as unknown as import('rxjs').Observable<
        [Record<string, unknown>[]]
      >
    ).subscribe(([userPersonOptions]) => {
        setDataState({
          userPersonOption: userPersonOptions?.[0],
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, user.uid])
  const { userPersonOption } = dataState

  const {
    ga_strasse,
    ga_plz,
    ga_ort,
    ga_geom_point,
    ga_lat_lng,
    ga_aktiv,
    ga_bemerkungen,
} = (userPersonOption ?? {}) as unknown as Record<string, unknown>

  const saveToDb = (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    const field = event.target.name
    const value = event.target.value === 'false'
    const option = userPersonOption as unknown as {
      edit?: (args: { field?: string; value?: unknown }) => void
    }
    option?.edit?.({ field, value })
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
        <div className={styles.title}>Felder für Gärten wählen:</div>
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
          value={ga_strasse === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!ga_strasse}
              onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
              name="ga_strasse"
            />
          }
          label="Strasse"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={ga_plz === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!ga_plz}
              onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
              name="ga_plz"
            />
          }
          label="PLZ"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={ga_ort === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!ga_ort}
              onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
              name="ga_ort"
            />
          }
          label="Ort"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={ga_geom_point === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!ga_geom_point}
              onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
              name="ga_geom_point"
            />
          }
          label="Koordinaten"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={ga_lat_lng === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!ga_lat_lng}
              onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
              name="ga_lat_lng"
            />
          }
          label="Längen- und Breitengrade"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={ga_aktiv === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!ga_aktiv}
              onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
              name="ga_aktiv"
            />
          }
          label="aktiv"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={ga_bemerkungen === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!ga_bemerkungen}
              onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
              name="ga_bemerkungen"
            />
          }
          label="Bemerkungen"
          labelPlacement="end"
        />
      </MenuItem>
      <div className={styles.info}>
        Zwingende Felder sind nicht aufgelistet.
        <br />
        Die Wahl gilt für alle Gärten.
      </div>
    </Menu>
  )
}
