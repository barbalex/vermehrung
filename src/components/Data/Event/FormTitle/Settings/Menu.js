import React, { useContext, useCallback, useMemo } from 'react'
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

const constants = getConstants()

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  user-select: none;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 800;
  user-select: none;
`
const Info = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.4);
  user-select: none;
`

const SettingsEventsMenu = ({ anchorEl, setAnchorEl, kulturId }) => {
  const store = useContext(StoreContext)

  const kulturOption = useMemo(() => store.kultur_options.get(kulturId) ?? {}, [
    kulturId,
    store.kultur_options,
  ])
  const { ev_datum, ev_teilkultur_id, ev_geplant, ev_person_id } = kulturOption

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'false'
      kulturOption.edit({ field, value })
    },
    [kulturOption],
  )
  const openSettingsDocs = useCallback(() => {
    setAnchorEl(null)
    const url = `${constants?.appUri}/Dokumentation/Felder-blenden`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
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
          >
            <IoMdInformationCircleOutline />
          </IconButton>
        </div>
      </TitleRow>
      <MenuItem>
        <FormControlLabel
          value={ev_teilkultur_id === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={ev_teilkultur_id}
              onClick={saveToDb}
              name="ev_teilkultur_id"
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