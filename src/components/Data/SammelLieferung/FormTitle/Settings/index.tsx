import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { FaCog } from 'react-icons/fa'

import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'
import { SettingsSammelLieferungMenu as Menu } from './Menu.tsx'

export const SammelLieferungSettings = ({ asMenu }: { asMenu?: boolean }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined | null>(null)
  const onClickConfig = (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => setAnchorEl(event.currentTarget)

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
        size="large"
      >
        <FaCog />
      </IconButton>
      <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </ErrorBoundary>
  )
}
