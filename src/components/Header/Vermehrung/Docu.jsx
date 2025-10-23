import { useContext } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { FaBook } from 'react-icons/fa'
import styled from '@emotion/styled'
import { Link } from 'react-router'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../mobxStoreContext.js'

const StyledButton = styled(Button)`
  color: white !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  border-width: 0 !important;
  text-transform: none !important;
  margin-right: 5px !important;
  &:hover {
    border-width: 1px !important;
  }
`

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
    <StyledButton
      variant="outlined"
      component={Link}
      to="/Dokumentation/"
    >
      Dokumentation
    </StyledButton>
  )
})
