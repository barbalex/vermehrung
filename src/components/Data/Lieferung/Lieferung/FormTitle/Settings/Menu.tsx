import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from 'nitromelondb'

import { dbAtom, userAtom } from '../../../../../../store/index.ts'
import { constants } from '../../../../../../utils/constants.ts'

import styles from './Menu.module.css'

export const LieferungSettingsMenu = ({
  anchorEl,
  setAnchorEl,
}: {
  anchorEl: HTMLElement | null | undefined
  setAnchorEl: (el: HTMLElement | null) => void
}) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)

  const [dataState, setDataState] = useState({
    userPersonOption: {},
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          ?.get<import('../../../../../../dbModel.ts').PersonOption>(
            'person_option',
          )
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['li_show_sl_felder', 'li_show_sl'])
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

  const { li_show_sl_felder, li_show_sl } =
      (userPersonOption ?? {}) as unknown as Record<string, unknown>

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
        <div className={styles.title}>Optionen für Lieferungen wählen:</div>
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
          value={li_show_sl === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!li_show_sl}
              onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
              name="li_show_sl"
            />
          }
          label="Sammel-Lieferung rechts neben der Lieferung anzeigen"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={li_show_sl_felder === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!li_show_sl_felder}
              onClick={
                  saveToDb as unknown as import('react').MouseEventHandler
                }
              name="li_show_sl_felder"
            />
          }
          label="Felder anzeigen, deren Werte in der Sammel-Lieferung gesetzt wurden"
          labelPlacement="end"
        />
      </MenuItem>
      <div className={styles.info}>Die Wahl gilt für alle Lieferungen.</div>
    </Menu>
  )
}
