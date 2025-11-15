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

import { title } from './Menu.module.css'

export const KulturSettingsMenu = observer(
  ({ anchorEl, setAnchorEl, kulturId }) => {
    const store = useContext(MobxStoreContext)
    const { user, db } = store

    const [dataState, setDataState] = useState({
      kulturOption: undefined,
      userPersonOption: {},
    })
    useEffect(() => {
      const userPersonOptionsObservable =
        user.uid ?
          db
            .get('person_option')
            .query(Q.on('person', Q.where('account_id', user.uid)))
            .observeWithColumns(['ku_zwischenlager', 'ku_erhaltungskultur'])
        : $of({})
      const kulturOptionObservable =
        kulturId ? db.get('kultur_option').findAndObserve(kulturId) : $of({})
      const combinedObservables = combineLatest([
        userPersonOptionsObservable,
        kulturOptionObservable,
      ])
      const subscription = combinedObservables.subscribe(
        ([userPersonOptions, kulturOption]) => {
          setDataState({
            userPersonOption: userPersonOptions?.[0],
            kulturOption,
          })
        },
      )

      return () => subscription?.unsubscribe?.()
    }, [db, kulturId, user.uid])
    const { kulturOption, userPersonOption } = dataState

    const { ku_zwischenlager, ku_erhaltungskultur } = userPersonOption ?? {}
    const { tk } = kulturOption ?? {}

    const saveToDbKulturOption = async (event) => {
      const field = event.target.name
      const value = event.target.value === 'false'
      kulturOption.edit({ field, value, store })
    }

    const saveToDbPersonOption = async (event) => {
      const field = event.target.name
      const value = event.target.value === 'false'
      userPersonOption.edit({ field, value, store })
    }

    const onClose = () => setAnchorEl(null)

    const openOptionDocs = () => {
      setAnchorEl(null)
      const url = `${constants?.getAppUri()}/Dokumentation/teilkulturen`
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }

    return (
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <div className={title}>Optionen für diese Kultur:</div>
        <MenuItem>
          <FormControlLabel
            value={tk === true ? 'true' : 'false'}
            control={
              <Checkbox
                color="primary"
                checked={tk}
                onClick={saveToDbKulturOption}
                name="tk"
              />
            }
            label="Mit Teil-Kulturen arbeiten"
            labelPlacement="end"
          />
          <div>
            <IconButton
              aria-label="Anleitung öffnen"
              title="Anleitung öffnen"
              onClick={openOptionDocs}
              size="large"
            >
              <IoMdInformationCircleOutline />
            </IconButton>
          </div>
        </MenuItem>
        <div className={title}>
          Optionale Felder wählen (für alle Kulturen):
        </div>
        <MenuItem>
          <FormControlLabel
            value={ku_zwischenlager === true ? 'true' : 'false'}
            control={
              <Checkbox
                color="primary"
                checked={ku_zwischenlager}
                onClick={saveToDbPersonOption}
                name="ku_zwischenlager"
              />
            }
            label="Zwischenlager"
            labelPlacement="end"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            value={ku_erhaltungskultur === true ? 'true' : 'false'}
            control={
              <Checkbox
                color="primary"
                checked={ku_erhaltungskultur}
                onClick={saveToDbPersonOption}
                name="ku_erhaltungskultur"
              />
            }
            label="Erhaltungskultur"
            labelPlacement="end"
          />
        </MenuItem>
      </Menu>
    )
  },
)
