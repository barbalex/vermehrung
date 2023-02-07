import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { FaCog } from 'react-icons/fa'

import ErrorBoundary from '../../../../shared/ErrorBoundary'
import Menu from './Menu'

const SettingsSammelLieferung = ({ asMenu }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const onClickConfig = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )

  if (asMenu) {
    return (
      <>
        <MenuItem
          aria-owns={anchorEl ? 'menu' : null}
          aria-haspopup="true"
          onClick={onClickConfig}
        >
          Optionen wählen
        </MenuItem>
        <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </>
    )
  }

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Optionen wählen"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Optionen wählen"
        onClick={onClickConfig}
        size="large">
        <FaCog />
      </IconButton>
      <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </ErrorBoundary>
  );
}

export default observer(SettingsSammelLieferung)
