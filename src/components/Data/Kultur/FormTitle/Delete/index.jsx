import React, { useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaMinus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import ErrorBoundary from '../../../../shared/ErrorBoundary'
import Menu from './Menu'

const KulturDeleteButton = ({ row, asMenu }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const onClickButton = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )

  if (asMenu) {
    return (
      <>
        <MenuItem
          aria-haspopup="true"
          onClick={onClickButton}
          disabled={!!row._deleted}
        >
          Kultur löschen
        </MenuItem>
        <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} row={row} />
      </>
    )
  }

  return (
    <ErrorBoundary>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        aria-label="Kultur löschen"
        title="Kultur löschen"
        onClick={onClickButton}
        disabled={!!row._deleted}
        size="large"
      >
        <FaMinus />
      </IconButton>
      <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} row={row} />
    </ErrorBoundary>
  )
}

export default observer(KulturDeleteButton)
