import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'

import { StoreContext } from '../../../../../models/reactUtils'
import signup from '../../../../../utils/signup'
import Menu from './Menu'

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
