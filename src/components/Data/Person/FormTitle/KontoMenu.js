import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { StoreContext } from '../../../../models/reactUtils'
import signup from '../../../../utils/signup'
import deleteAccount from '../../../../utils/deleteAccount'
import setPassword from '../../../../utils/setPassword'

const StyledButton = styled(Button)`
  text-transform: none !important;
`

const KontoMenu = ({ row }) => {
  const store = useContext(StoreContext)

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null)
  const menuOpen = Boolean(menuAnchorEl)

  const createNewAccount = useCallback(() => {
    signup({ store, person: row })
    setMenuAnchorEl(null)
  }, [row, store])
  const onClickResetPassword = useCallback(() => {
    setPassword({ store, person: row })
    setMenuAnchorEl(null)
  }, [row, store])
  const onClickDeleteAccount = useCallback(() => {
    deleteAccount({ store, person: row })
    setMenuAnchorEl(null)
  }, [row, store])

  if (!row.account_id) {
    return (
      <StyledButton color="primary" onClick={createNewAccount}>
        Neues Konto
      </StyledButton>
    )
  }
  return (
    <>
      <StyledButton
        color="primary"
        onClick={(event) => setMenuAnchorEl(event.currentTarget)}
      >
        Konto
      </StyledButton>
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
    </>
  )
}

export default observer(KontoMenu)
