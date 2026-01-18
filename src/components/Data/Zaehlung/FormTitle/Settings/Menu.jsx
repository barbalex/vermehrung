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

export const ZaehlungSettingsMenu = observer(
  ({ anchorEl, setAnchorEl, kulturId }) => {
    const store = useContext(MobxStoreContext)
    const { db } = store

    const [kulturOption, setKulturOption] = useState()
    useEffect(() => {
      const kOObservable = db.get('kultur_option').findAndObserve(kulturId)
      const subscription = kOObservable.subscribe((kulturOption) =>
        setKulturOption(kulturOption),
      )

      return () => subscription?.unsubscribe?.()
    }, [db, kulturId])
    const { z_bemerkungen } = kulturOption ?? {}

    const saveToDb = async (event) => {
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
          <div className={styles.title}>Felder wählen:</div>
          <div>
            <IconButton
              aria-label="Anleitung öffnen"
              title="Anleitung öffnen"
              onClick={openSettingsDocs}
              size="large"
            >
              <IoMdInformationCircleOutline className={styles.info} />
            </IconButton>
          </div>
        </div>
        <MenuItem>
          <FormControlLabel
            value={z_bemerkungen === true ? 'true' : 'false'}
            control={
              <Checkbox
                color="primary"
                checked={z_bemerkungen}
                onClick={saveToDb}
                name="z_bemerkungen"
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
  },
)
