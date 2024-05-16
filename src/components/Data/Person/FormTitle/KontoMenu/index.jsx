import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import StoreContext from '../../../../../storeContext.js'
import signup from '../../../../../utils/signup.js'
import Menu from './Menu.jsx'

const StyledButton = styled(Button)`
  text-transform: none !important;
`

const KontoMenu = ({ row, asMenu }) => {
  const store = useContext(StoreContext)

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null)

  const createNewAccount = useCallback(() => {
    signup({ store, person: row })
    setMenuAnchorEl(null)
  }, [row, store])

  if (!row.account_id) {
    if (asMenu) {
      return <MenuItem onClick={createNewAccount}>Neues Konto</MenuItem>
    }

    return (
      <StyledButton color="primary" onClick={createNewAccount}>
        Neues Konto
      </StyledButton>
    )
  }

  if (asMenu) {
    // return MenuItems directly as they are only ones
    return (
      <Menu
        row={row}
        menuAnchorEl={menuAnchorEl}
        setMenuAnchorEl={setMenuAnchorEl}
        asMenu
      />
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
        row={row}
        menuAnchorEl={menuAnchorEl}
        setMenuAnchorEl={setMenuAnchorEl}
      />
    </>
  )
}

export default observer(KontoMenu)
