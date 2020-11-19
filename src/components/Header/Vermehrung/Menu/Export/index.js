import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

//import { StoreContext } from '../../../../../models/reactUtils'

const SettingsOverallMenu = ({
  anchorEl: parentAnchorEl,
  setAnchorEl: setParentAnchorEl,
  setParentAnchorEl: setGrandParentAnchorEl,
}) => {
  //const store = useContext(StoreContext)

  const onClickLieferungenDesJahrs = useCallback(
    (event) => {
      const value = event.target.value
      console.log('Menu Export, value', value)
      if (value.length === 4) {
        console.log('Menu Export, jetzt rechnen')
        setParentAnchorEl(null)
        setGrandParentAnchorEl(null)
      }
    },
    [setGrandParentAnchorEl, setParentAnchorEl],
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
