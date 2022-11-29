import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'

import MenuItem from '@mui/material/MenuItem'
import { MdMenu } from 'react-icons/md'
import styled from '@emotion/styled'

import ErrorBoundary from '../../../shared/ErrorBoundary'
import Menu from './Menu'

const Icon = styled(MdMenu)`
  color: white;
`

const MenuComponent = ({ asMenu }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const onClickMenu = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )

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
        <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
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
        size="large">
        <Icon />
      </IconButton>
      <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </ErrorBoundary>
  );
}

export default observer(MenuComponent)
