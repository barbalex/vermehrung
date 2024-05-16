import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import StoreContext from '../../../../../storeContext.js'
import deleteAccount from '../../../../../utils/deleteAccount'
import setPassword from '../../../../../utils/setPassword'

const KontoMenuMenu = ({ row, menuAnchorEl, setMenuAnchorEl, asMenu }) => {
  const store = useContext(StoreContext)

  const menuOpen = Boolean(menuAnchorEl)

  const onClickResetPassword = useCallback(() => {
    setPassword({ store, person: row })
    setMenuAnchorEl(null)
  }, [row, setMenuAnchorEl, store])
  const onClickDeleteAccount = useCallback(() => {
    deleteAccount({ store, person: row })
    setMenuAnchorEl(null)
  }, [row, setMenuAnchorEl, store])

  if (asMenu) {
    return (
      // return MenuItems directly as they are only ones
      <>
        <MenuItem onClick={onClickResetPassword}>
          Konto: Email schicken, um Passwort zu setzen (2 Std. gültig)
        </MenuItem>
        <MenuItem onClick={onClickDeleteAccount}>Konto löschen</MenuItem>
      </>
    )
  }

  return (
    <Menu
      id="menu"
      anchorEl={menuAnchorEl}
      open={menuOpen}
      onClose={() => setMenuAnchorEl(null)}
    >
      <MenuItem onClick={onClickResetPassword}>
        Email schicken, um Passwort zu setzen (nur 2 Stunden gültig)
      </MenuItem>
      <MenuItem onClick={onClickDeleteAccount}>Konto löschen</MenuItem>
    </Menu>
  )
}

export default observer(KontoMenuMenu)
