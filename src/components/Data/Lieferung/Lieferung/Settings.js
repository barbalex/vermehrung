import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
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

const SettingsLieferung = () => {
  const store = useContext(StoreContext)
  const { userPersonOption } = store

  const { li_show_sl_felder, li_show_sl } = userPersonOption

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'false'
      userPersonOption.edit({ field, value })
    },
    [userPersonOption],
  )
  const openSettingsDocs = useCallback(() => {
    setAnchorEl(null)
    const url = `${constants.appUri}/Dokumentation/Felder-blenden`
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
            <Title>Optionen für Lieferungen wählen:</Title>
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
              value={li_show_sl === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={li_show_sl}
                  onClick={saveToDb}
                  name="li_show_sl"
                />
              }
              label="Sammel-Lieferung rechts neben der Lieferung anzeigen"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={li_show_sl_felder === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={li_show_sl_felder}
                  onClick={saveToDb}
                  name="li_show_sl_felder"
                />
              }
              label="Felder anzeigen, deren Werte in der Sammel-Lieferung gesetzt wurden"
              labelPlacement="end"
            />
          </MenuItem>
          <Info>Die Wahl gilt für alle Lieferungen.</Info>
        </Menu>
      }
    </ErrorBoundary>
  )
}

export default observer(SettingsLieferung)
