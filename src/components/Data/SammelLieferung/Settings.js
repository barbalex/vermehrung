import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { FaCog } from 'react-icons/fa'
import styled from 'styled-components'

import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 800;
  user-select: none;
`

const SettingsSammelLieferung = () => {
  const store = useContext(StoreContext)
  const { userPersonOption } = store

  const { sl_show_empty_when_next_to_li, sl_auto_copy_edits } = userPersonOption

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'false'
      userPersonOption.edit({ field, value })
    },
    [userPersonOption],
  )

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
            <Title>Optionen für Sammel-Lieferungen wählen:</Title>
          </TitleRow>
          <MenuItem>
            <FormControlLabel
              value={sl_show_empty_when_next_to_li === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={sl_show_empty_when_next_to_li}
                  onClick={saveToDb}
                  name="sl_show_empty_when_next_to_li"
                />
              }
              label="Felder mit Leer-Werten anzeigen (wenn neben einer Lieferung angezeigt)"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={sl_auto_copy_edits === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={sl_auto_copy_edits}
                  onClick={saveToDb}
                  name="sl_auto_copy_edits"
                />
              }
              label="Änderungen automatisch in alle Lieferungen kopieren"
              labelPlacement="end"
            />
          </MenuItem>
        </Menu>
      }
    </ErrorBoundary>
  )
}

export default observer(SettingsSammelLieferung)
