import { useAtomValue } from 'jotai'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { FaBook } from 'react-icons/fa'
import { Link } from 'react-router'

import { singleColumnViewAtom } from '../../../store/index.js'
import styles from './Docu.module.css'

export const HeaderDocu = ({ asMenu }) => {
  const singleColumnView = useAtomValue(singleColumnViewAtom)

  if (singleColumnView) {
    if (asMenu) {
      return (
        <MenuItem component={Link} to="/Dokumentation/">
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
      className={styles.button}
    >
      Dokumentation
    </Button>
  )
}
