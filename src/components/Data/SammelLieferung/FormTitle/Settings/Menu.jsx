import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { dbAtom, userAtom } from '../../../../../store/index.js'

import settingsStyles from '../../../Lieferung/Lieferung/FormTitle/Settings/Menu.module.css'

export const SettingsSammelLieferungMenu = ({ anchorEl, setAnchorEl }) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)

  const [dataState, setDataState] = useState({
    userPersonOption: {},
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns([
            'sl_show_empty_when_next_to_li',
            'sl_auto_copy_edits',
          ])
      : $of({})
    const combinedObservables = combineLatest([userPersonOptionsObservable])
    const subscription = combinedObservables.subscribe(
      ([userPersonOptions]) => {
        setDataState({
          userPersonOption: userPersonOptions?.[0],
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, user.uid])
  const { userPersonOption } = dataState
  const { sl_show_empty_when_next_to_li, sl_auto_copy_edits } =
    userPersonOption ?? {}

  const saveToDb = (event) => {
    const field = event.target.name
    const value = event.target.value === 'false'
    userPersonOption.edit({ field, value })
  }

  const onClose = () => setAnchorEl(null)

  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <div className={settingsStyles.titleRow}>
        <div className={settingsStyles.title}>
          Optionen für Sammel-Lieferungen wählen:
        </div>
      </div>
      <MenuItem>
        <FormControlLabel
          value={sl_show_empty_when_next_to_li === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={sl_show_empty_when_next_to_li}
              onClick={saveToDb}
              name="sl_show_empty_when_next_to_li"
            />
          }
          label="Felder mit Leer-Werten anzeigen (wenn neben einer Lieferung angezeigt)"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={sl_auto_copy_edits === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={sl_auto_copy_edits}
              onClick={saveToDb}
              name="sl_auto_copy_edits"
            />
          }
          label="Änderungen automatisch in alle Lieferungen kopieren"
          labelPlacement="end"
        />
      </MenuItem>
    </Menu>
  )
}
