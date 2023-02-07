import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { FaHome } from 'react-icons/fa'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import StoreContext from '../../../storeContext'

const SiteTitle = styled(Button)`
  display: none;
  color: white !important;
  font-size: 20px !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  border-width: 0 !important;
  text-transform: unset !important;
  @media (min-width: 700px) {
    display: block;
  }
  &:hover {
    border-width: 1px !important;
  }
`

const Home = ({ asMenu }) => {
  const store = useContext(StoreContext)
  const { singleColumnView } = store

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
        size="large">
        <FaHome />
      </IconButton>
    );
  }

  return (
    <SiteTitle variant="outlined" component={Link} to="/" title="Home">
      Vermehrung
    </SiteTitle>
  )
}

export default observer(Home)
