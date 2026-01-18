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

export const GartenSettingsMenu = observer(({ anchorEl, setAnchorEl }) => {
  const store = useContext(MobxStoreContext)
  const { user, db } = store

  const [dataState, setDataState] = useState({
    userPersonOption: undefined,
  })
  useEffect(() => {
    const userPersonOptionsObservable =
      user.uid ?
        db
          .get('person_option')
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

  const {
    ga_strasse,
    ga_plz,
    ga_ort,
    ga_geom_point,
    ga_lat_lng,
    ga_aktiv,
    ga_bemerkungen,
  } = userPersonOption ?? {}

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
              checked={ga_strasse}
              onClick={saveToDb}
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
              checked={ga_plz}
              onClick={saveToDb}
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
              checked={ga_ort}
              onClick={saveToDb}
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
              checked={ga_geom_point}
              onClick={saveToDb}
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
              checked={ga_lat_lng}
              onClick={saveToDb}
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
              checked={ga_aktiv}
              onClick={saveToDb}
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
              checked={ga_bemerkungen}
              onClick={saveToDb}
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
})
