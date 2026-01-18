import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IoMdInformationCircleOutline } from 'react-icons/io'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { constants } from '../../../../../utils/constants.js'

import styles from './Menu.module.css'

export const EventSettingsMenu = observer(
  ({ anchorEl, setAnchorEl, kulturId }) => {
    const store = useContext(MobxStoreContext)
    const { db } = store

    const [dataState, setDataState] = useState({ kulturOption: undefined })
    const { kulturOption } = dataState

    useEffect(() => {
      const kulturOptionObservable = db
        .get('kultur_option')
        .findAndObserve(kulturId)
      const subscription = kulturOptionObservable.subscribe((kulturOption) =>
        setDataState({ kulturOption }),
      )

      return () => subscription?.unsubscribe?.()
    }, [db, kulturId])

    const { ev_datum, tk, ev_geplant, ev_person_id } = kulturOption ?? {}

    const saveToDb = (event) => {
      const field = event.target.name
      const value = event.target.value === 'false'
      kulturOption.edit({ field, value, store })
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
          <div className={styles.title}>Felder für Events wählen:</div>
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
            value={tk === true ? 'true' : 'false'}
            control={
              <Checkbox
                color="primary"
                checked={tk}
                onClick={saveToDb}
                name="tk"
              />
            }
            label="Teilkultur"
            labelPlacement="end"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            value={ev_person_id === true ? 'true' : 'false'}
            control={
              <Checkbox
                color="primary"
                checked={ev_person_id}
                onClick={saveToDb}
                name="ev_person_id"
              />
            }
            label="Wer"
            labelPlacement="end"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            value={ev_datum === true ? 'true' : 'false'}
            control={
              <Checkbox
                color="primary"
                checked={ev_datum}
                onClick={saveToDb}
                name="ev_datum"
              />
            }
            label="Datum"
            labelPlacement="end"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            value={ev_geplant === true ? 'true' : 'false'}
            control={
              <Checkbox
                color="primary"
                checked={ev_geplant}
                onClick={saveToDb}
                name="ev_geplant"
              />
            }
            label="geplant"
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
  },
)
