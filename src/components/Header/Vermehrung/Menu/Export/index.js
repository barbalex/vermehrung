import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import { StoreContext } from '../../../../../models/reactUtils'
import buildExceljsWorksheets from './buildExceljsWorksheets'

const SettingsOverallMenu = ({
  anchorEl: parentAnchorEl,
  setAnchorEl: setParentAnchorEl,
  setParentAnchorEl: setGrandParentAnchorEl,
}) => {
  const store = useContext(StoreContext)

  const onClickLieferungenDesJahrs = useCallback(
    (event) => {
      const year = event.target.value
      if (year.length === 4) {
        buildExceljsWorksheets({ year, store })
        setParentAnchorEl(null)
        setGrandParentAnchorEl(null)
      }
    },
    [setGrandParentAnchorEl, setParentAnchorEl, store],
  )

  const onClose = useCallback(() => setParentAnchorEl(null), [
    setParentAnchorEl,
  ])

  return (
    <Menu
      id="menuExport"
      anchorEl={parentAnchorEl}
      open={Boolean(parentAnchorEl)}
      onClose={onClose}
    >
      <MenuItem>
        <TextField
          label="Lieferungen des Jahrs:"
          onChange={onClickLieferungenDesJahrs}
        />
      </MenuItem>
    </Menu>
  )
}

export default observer(SettingsOverallMenu)
