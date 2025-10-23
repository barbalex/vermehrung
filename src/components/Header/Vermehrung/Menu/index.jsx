import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'

import MenuItem from '@mui/material/MenuItem'
import { MdMenu } from 'react-icons/md'
import styled from '@emotion/styled'

import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'
import { HeaderHamburgerMenu as Menu } from './Menu.jsx'

const Icon = styled(MdMenu)`
  color: white;
`

export const HeaderHamburgerMenu = observer(({ asMenu }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const onClickMenu = (event) => setAnchorEl(event.currentTarget)

  if (asMenu) {
    return (
      <>
        <MenuItem
          aria-owns={anchorEl ? 'menu' : null}
          aria-haspopup="true"
          onClick={onClickMenu}
        >
          Menu
        </MenuItem>
        <Menu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
      </>
    )
  }

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Menu"
        aria-owns={anchorEl ? 'menu' : null}
        aria-haspopup="true"
        title="Menu"
        onClick={onClickMenu}
        size="large"
      >
        <Icon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </ErrorBoundary>
  )
})
