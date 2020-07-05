import React, { useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import { FaBars } from 'react-icons/fa'
import styled from 'styled-components'

const MenuButton = styled(IconButton)`
  color: white !important;
`

const HeaderMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const closeMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])
  const onClickButton = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )

  return (
    <>
      <MenuButton
        aria-controls="menu"
        aria-haspopup="true"
        aria-label="Menu"
        title="Menu"
        onClick={onClickButton}
      >
        <FaBars />
      </MenuButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        {children}
      </Menu>
    </>
  )
}

export default observer(HeaderMenu)
