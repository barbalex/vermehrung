import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import { FaCog } from 'react-icons/fa'

import ErrorBoundary from '../../../../shared/ErrorBoundary'
import Menu from './Menu'

const SettingsGarten = ({ asMenu }) => {
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
        aria-label="Felder wählen"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Felder wählen"
        onClick={onClickConfig}
      >
        <FaCog />
      </IconButton>
      <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </ErrorBoundary>
  )
}

export default observer(SettingsGarten)
