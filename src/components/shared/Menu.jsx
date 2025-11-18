import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import MuiMenu from '@mui/material/Menu'
import { FaBars } from 'react-icons/fa'

export const Menu = ({ children, title = 'Menu', white = true }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const closeMenu = () => setAnchorEl(null)
  const onClickButton = (event) => setAnchorEl(event.currentTarget)

  const menuButtonStyle = white ? { color: 'white' } : {}

  return (
    <>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        aria-label={title}
        title={title}
        onClick={onClickButton}
        data-white={white}
        style={menuButtonStyle}
      >
        <FaBars />
      </IconButton>
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
}
