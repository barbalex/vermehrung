import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import styled from '@emotion/styled'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../../../storeContext.js'
import constants from '../../../../../utils/constants.js'

const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
  user-select: none;
`

const SettingsKulturMenu = ({ anchorEl, setAnchorEl, kulturId }) => {
  const store = useContext(StoreContext)
  const { user, db } = store

  const [dataState, setDataState] = useState({
    kulturOption: undefined,
    userPersonOption: {},
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['ku_zwischenlager', 'ku_erhaltungskultur'])
      : $of({})
    const kulturOptionObservable = kulturId
      ? db.get('kultur_option').findAndObserve(kulturId)
      : $of({})
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

  const saveToDbKulturOption = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'false'
      kulturOption.edit({ field, value, store })
    },
    [kulturOption, store],
  )

  const saveToDbPersonOption = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'false'
      userPersonOption.edit({ field, value, store })
    },
    [store, userPersonOption],
  )

  const onClose = useCallback(() => setAnchorEl(null), [setAnchorEl])
  const openOptionDocs = useCallback(() => {
    setAnchorEl(null)
    const url = `${constants?.getAppUri()}/Dokumentation/teilkulturen`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }, [setAnchorEl])

  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <Title>Optionen für diese Kultur:</Title>
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
      <Title>Optionale Felder wählen (für alle Kulturen):</Title>
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
}

export default observer(SettingsKulturMenu)
