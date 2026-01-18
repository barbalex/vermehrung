import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { signup } from '../../../../../utils/signup.js'
import { PersonKontoMenu as Menu } from './Menu.jsx'

import styles from './index.module.css'

export const PersonKonto = observer(({ row, asMenu }) => {
  const store = useContext(MobxStoreContext)

  const [menuAnchorEl, setMenuAnchorEl] = useState(null)

  const createNewAccount = () => {
    signup({ store, person: row })
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
        setMenuAnchorEl={setMenuAnchorEl}
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
        setMenuAnchorEl={setMenuAnchorEl}
      />
    </>
  )
})
