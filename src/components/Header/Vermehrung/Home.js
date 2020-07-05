import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import { FaHome } from 'react-icons/fa'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../models/reactUtils'
import exists from '../../../utils/exists'

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
  const { widthEnforced } = store.tree

  if (asMenu) {
    return (
      <MenuItem aria-label="Home" title="Home" component={Link} to="/">
        Home
      </MenuItem>
    )
  }

  if (exists(widthEnforced)) {
    return (
      <IconButton
        color="inherit"
        aria-label="Home"
        component={Link}
        to="/"
        title="Home"
      >
        <FaHome />
      </IconButton>
    )
  }

  return (
    <SiteTitle variant="outlined" component={Link} to="/" title="Home">
      Vermehrung
    </SiteTitle>
  )
}

export default observer(Home)
