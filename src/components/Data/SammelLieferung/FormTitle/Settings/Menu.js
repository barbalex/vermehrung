import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import styled from 'styled-components'

import { StoreContext } from '../../../../../models/reactUtils'

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

const SettingsSammelLieferungMenu = ({ anchorEl, setAnchorEl }) => {
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

  const onClose = useCallback(() => setAnchorEl(null), [setAnchorEl])

  return (
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
  )
}

export default observer(SettingsSammelLieferungMenu)
