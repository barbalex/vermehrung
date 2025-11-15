import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { constants } from '../../../../../utils/constants.js'

import { titleRow, title, info } from './Menu.module.css'

export const TeilkulturSettingsMenu = observer(
  ({ anchorEl, setAnchorEl, kulturId }) => {
    const store = useContext(MobxStoreContext)
    const { db } = store

    const [dataState, setDataState] = useState({ kulturOption: undefined })
    const { kulturOption } = dataState
    const { tk_bemerkungen } = kulturOption ?? {}

    useEffect(() => {
      const kOObservable =
        kulturId ? db.get('kultur_option').findAndObserve(kulturId) : $of({})
      const subscription = kOObservable.subscribe((kulturOption) =>
        setDataState({ kulturOption }),
      )

      return () => subscription?.unsubscribe?.()
    }, [db, kulturId])

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
        <div className={titleRow}>
          <div className={title}>Felder für Teilkulturen wählen:</div>
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
                checked={tk_bemerkungen}
                onClick={saveToDb}
                name="tk_bemerkungen"
              />
            }
            label="Bemerkungen"
            labelPlacement="end"
          />
        </MenuItem>
        <div className={info}>
          Zwingende Felder sind nicht aufgelistet.
          <br />
          Die Wahl gilt (nur) für diese Kultur.
        </div>
      </Menu>
    )
  },
)
