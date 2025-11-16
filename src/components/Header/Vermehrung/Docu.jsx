import { useContext } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { FaBook } from 'react-icons/fa'
import { Link } from 'react-router'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { button } from './Docu.module.css'

export const HeaderDocu = observer(({ asMenu }) => {
  const store = useContext(MobxStoreContext)
  const { singleColumnView } = store

  if (singleColumnView) {
    if (asMenu) {
      return (
        <MenuItem
          component={Link}
          to="/Dokumentation/"
        >
          Dokumentation
        </MenuItem>
      )
    }

    return (
      <IconButton
        color="inherit"
        aria-label="Dokumentation"
        component={Link}
        to="/Dokumentation/"
        title="Dokumentation"
        size="large"
      >
        <FaBook />
      </IconButton>
    )
  }

  return (
    <Button
      variant="outlined"
      component={Link}
      to="/Dokumentation/"
      className={button}
    >
      Dokumentation
    </Button>
  )
})
