import { useContext } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../mobxStoreContext.js'

import { siteTitle } from './Home.module.css'

export const HeaderHome = observer(({ asMenu }) => {
  const store = useContext(MobxStoreContext)
  const { singleColumnView } = store

  if (asMenu) {
    return (
      <MenuItem
        component={Link}
        to="/"
      >
        Home
      </MenuItem>
    )
  }

  if (singleColumnView) {
    return (
      <IconButton
        color="inherit"
        aria-label="Home"
        component={Link}
        to="/"
        title="Home"
        size="large"
      >
        <FaHome />
      </IconButton>
    )
  }

  return (
    <Button
      variant="outlined"
      component={Link}
      to="/"
      title="Home"
      className={siteTitle}
    >
      Vermehrung
    </Button>
  )
})
