import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { FaCog } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { constants } from '../../../../../utils/constants.js'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'

import { titleRow, title, info } from './Settings.module.css'

export const TeilzaehlungenSettings = observer(({ kulturId }) => {
  const store = useContext(MobxStoreContext)
  const { db } = store

  const [dataState, setDataState] = useState({
    kulturOption: undefined,
  })
  useEffect(() => {
    const kulturOptionObservable =
      kulturId ? db.get('kultur_option').findAndObserve(kulturId) : $of({})
    const subscription = kulturOptionObservable.subscribe(
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

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = () => setAnchorEl(null)
  const onClickConfig = (event) => setAnchorEl(event.currentTarget)

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Felder wählen"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Felder wählen"
        onClick={onClickConfig}
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
          <div className={titleRow}>
            <div className={title}>Felder für Teil-Zählungen wählen:</div>
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
              value={tz_teilkultur_id === true ? 'true' : 'false'}
              control={
                <Checkbox
                  color="primary"
                  checked={tz_teilkultur_id}
                  onClick={saveToDb}
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
                  checked={tz_andere_menge}
                  onClick={saveToDb}
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
                  checked={tz_auspflanzbereit_beschreibung}
                  onClick={saveToDb}
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
                  checked={tz_bemerkungen}
                  onClick={saveToDb}
                  name="tz_bemerkungen"
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
      }
    </ErrorBoundary>
  )
})
