import React, { useContext, useCallback, useState, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { FaCog } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import styled from 'styled-components'

import { StoreContext } from '../../../../models/reactUtils'
import getConstants from '../../../../utils/constants'
import ErrorBoundary from '../../../shared/ErrorBoundary'

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

const SettingsTeilzaehlungen = ({ kulturId }) => {
  const store = useContext(StoreContext)

  const kulturOption = useMemo(() => store.kultur_options.get(kulturId) ?? {}, [
    kulturId,
    store.kultur_options,
  ])
  const {
    tz_teilkultur_id,
    tz_anzahl_mutterpflanzen,
    tz_andere_menge,
    tz_auspflanzbereit_beschreibung,
    tz_bemerkungen,
  } = kulturOption

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
  }, [])

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = useCallback(() => setAnchorEl(null), [])
  const onClickConfig = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Felder wählen"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Felder wählen"
        onClick={onClickConfig}
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
          <TitleRow>
            <Title>Felder für Teil-Zählungen wählen:</Title>
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
              value={tz_anzahl_mutterpflanzen === true ? 'true' : 'false'}
              control={
                <Checkbox
                  color="primary"
                  checked={tz_anzahl_mutterpflanzen}
                  onClick={saveToDb}
                  name="tz_anzahl_mutterpflanzen"
                />
              }
              label="Anzahl Mutterpflanzen"
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
          <Info>
            Zwingende Felder sind nicht aufgelistet.
            <br />
            Die Wahl gilt (nur) für diese Kultur.
          </Info>
        </Menu>
      }
    </ErrorBoundary>
  )
}

export default observer(SettingsTeilzaehlungen)
