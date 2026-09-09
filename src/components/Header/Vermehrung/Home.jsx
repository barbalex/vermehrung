import { useAtomValue } from 'jotai'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router'

import { singleColumnViewAtom } from '../../../store/index.js'

import styles from './Home.module.css'

export const HeaderHome = ({ asMenu }) => {
  const singleColumnView = useAtomValue(singleColumnViewAtom)

  if (asMenu) {
    return (
      <MenuItem component={Link} to="/">
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
      className={styles.siteTitle}
    >
      Vermehrung
    </Button>
  )
}
