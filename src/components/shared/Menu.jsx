import React, { useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import MuiMenu from '@mui/material/Menu'
import { FaBars } from 'react-icons/fa'
import styled from '@emotion/styled'

const MenuButton = styled(IconButton)`
  ${(props) => props['data-white'] && 'color: white !important;'}
`

export const Menu = observer(({ children, title = 'Menu', white = true }) => {
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
        aria-label={title}
        title={title}
        onClick={onClickButton}
        data-white={white}
      >
        <FaBars />
      </MenuButton>
      <MuiMenu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        {children}
      </MuiMenu>
    </>
  )
})
