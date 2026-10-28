import { useState } from 'react'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import { signup } from '../../../../../utils/signup.ts'
import { PersonKontoMenu as Menu } from './Menu.tsx'

import styles from './index.module.css'

export const PersonKonto = ({ row, asMenu }: { row?: Record<string, unknown> | null; asMenu?: boolean }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)

  const createNewAccount = () => {
    signup({ person: row })
    setMenuAnchorEl(null)
  }

  if (!row.account_id) {
    if (asMenu) {
      return <MenuItem onClick={createNewAccount}>Neues Konto</MenuItem>
    }

    return (
      <Button
        className={styles.button}
        color="primary"
        onClick={createNewAccount}
      >
        Neues Konto
      </Button>
    )
  }

  if (asMenu) {
    // return MenuItems directly as they are only ones
    return (
      <Menu
        row={row}
        menuAnchorEl={menuAnchorEl}
        setMenuAnchorEl={
                  setMenuAnchorEl as unknown as never
                }
        asMenu
      />
    )
  }

  return (
    <>
      <Button
        className={styles.button}
        color="primary"
        onClick={(event) => setMenuAnchorEl(event.currentTarget)}
      >
        Konto
      </Button>
      <Menu
        row={row}
        menuAnchorEl={menuAnchorEl}
        setMenuAnchorEl={
                  setMenuAnchorEl as unknown as never
                }
      />
    </>
  )
}
