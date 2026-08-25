import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { deleteAccount } from '../../../../../utils/deleteAccount.js'
import { setPassword } from '../../../../../utils/setPassword.js'

export const PersonKontoMenu = ({
  row,
  menuAnchorEl,
  setMenuAnchorEl,
  asMenu,
}) => {
  const menuOpen = Boolean(menuAnchorEl)

  const onClickResetPassword = () => {
    setPassword({ person: row })
    setMenuAnchorEl(null)
  }

  const onClickDeleteAccount = () => {
    deleteAccount({ person: row })
    setMenuAnchorEl(null)
  }

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
