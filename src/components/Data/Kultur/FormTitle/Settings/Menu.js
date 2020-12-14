import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import styled from 'styled-components'

import { StoreContext } from '../../../../../models/reactUtils'
import getConstants from '../../../../../utils/constants'
import getUserPersonOption from '../../../../../utils/getUserPersonOption'

const constants = getConstants()

const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 800;
  user-select: none;
`

const SettingsKulturMenu = ({ anchorEl, setAnchorEl, kulturId }) => {
  const store = useContext(StoreContext)
  const { user, db } = store

  const [dataState, setDataState] = useState({
    kulturOption: undefined,
    userPersonOption: undefined,
  })
  useEffect(() => {
    const run = async () => {
      const userPersonOption = await getUserPersonOption({ user, db })
      const kulturOption = await db.collections
        .get('kultur_option')
        .find(kulturId)
      setDataState({ userPersonOption, kulturOption })
    }
    run()
  }, [db, kulturId, user])
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
    const url = `${constants?.appUri}/Dokumentation/Teilkulturen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
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
