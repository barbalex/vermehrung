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

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { constants } from '../../../../../utils/constants.js'

import styles from './Menu.module.css'

export const HerkunftSettingsMenu = observer(({ anchorEl, setAnchorEl }) => {
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
          .observeWithColumns([
            'hk_kanton',
            'hk_land',
            'hk_bemerkungen',
            'hk_geom_point',
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

  const { hk_kanton, hk_land, hk_bemerkungen, hk_geom_point } =
    userPersonOption ?? {}

  const saveToDb = async (event) => {
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
        <div className={styles.title}>Felder für Herkünfte wählen:</div>
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
          value={hk_kanton === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={hk_kanton}
              onClick={saveToDb}
              name="hk_kanton"
            />
          }
          label="Kanton"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={hk_land === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={hk_land}
              onClick={saveToDb}
              name="hk_land"
            />
          }
          label="Land"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={hk_geom_point === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={hk_geom_point}
              onClick={saveToDb}
              name="hk_geom_point"
            />
          }
          label="Koordinaten"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={hk_bemerkungen === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={hk_bemerkungen}
              onClick={saveToDb}
              name="hk_bemerkungen"
            />
          }
          label="Bemerkungen"
          labelPlacement="end"
        />
      </MenuItem>
      <div className={styles.info}>
        Zwingende Felder sind nicht aufgelistet.
        <br />
        Die Wahl gilt für alle Herkünfte.
      </div>
    </Menu>
  )
})
