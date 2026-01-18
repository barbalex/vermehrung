import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../../../mobxStoreContext.js'
import { constants } from '../../../../../../utils/constants.js'

import styles from './Menu.module.css'

export const LieferungSettingsMenu = observer(({ anchorEl, setAnchorEl }) => {
  const store = useContext(MobxStoreContext)
  const { user, db } = store

  const [dataState, setDataState] = useState({
    userPersonOption: {},
  })
  useEffect(() => {
    const userPersonOptionsObservable =
      user.uid ?
        db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['li_show_sl_felder', 'li_show_sl'])
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

  const { li_show_sl_felder, li_show_sl } = userPersonOption ?? {}

  const saveToDb = (event) => {
    const field = event.target.name
    const value = event.target.value === 'false'
    userPersonOption.edit({ field, value, store })
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
              checked={li_show_sl}
              onClick={saveToDb}
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
              checked={li_show_sl_felder}
              onClick={saveToDb}
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
})
