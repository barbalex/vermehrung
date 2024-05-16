import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import styled from '@emotion/styled'

import StoreContext from '../../../../../storeContext.js'
import constants from '../../../../../utils/constants.js'

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  user-select: none;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
  user-select: none;
`
const Info = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.4);
  user-select: none;
`

const SettingsEventsMenu = ({ anchorEl, setAnchorEl, kulturId }) => {
  const store = useContext(StoreContext)
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

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'false'
      kulturOption.edit({ field, value, store })
    },
    [kulturOption, store],
  )
  const openSettingsDocs = useCallback(() => {
    setAnchorEl(null)
    const url = `${constants?.getAppUri()}/Dokumentation/felder-blenden`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }, [setAnchorEl])

  const onClose = useCallback(() => setAnchorEl(null), [setAnchorEl])

  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <TitleRow>
        <Title>Felder für Events wählen:</Title>
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
      </TitleRow>
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
      <Info>
        Zwingende Felder sind nicht aufgelistet.
        <br />
        Die Wahl gilt (nur) für diese Kultur.
      </Info>
    </Menu>
  )
}

export default observer(SettingsEventsMenu)
