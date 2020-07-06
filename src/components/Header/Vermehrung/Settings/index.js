import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'

import MenuItem from '@material-ui/core/MenuItem'
import { FaCog } from 'react-icons/fa'
import styled from 'styled-components'

import ErrorBoundary from '../../../shared/ErrorBoundary'
import Menu from './Menu'

const Icon = styled(FaCog)`
  color: white;
`

const SettingsOverall = ({ asMenu }) => {
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
        aria-owns={anchorEl ? 'menu' : null}
        aria-haspopup="true"
        title="Optionen wählen"
        onClick={onClickConfig}
      >
        <Icon />
      </IconButton>
      <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </ErrorBoundary>
  )
}

export default observer(SettingsOverall)
