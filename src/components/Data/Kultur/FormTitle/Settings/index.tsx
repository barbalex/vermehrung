import { useState } from 'react'
import IconButton from '@mui/material/IconButton'

import MenuItem from '@mui/material/MenuItem'
import { FaCog } from 'react-icons/fa'

import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'
import { KulturSettingsMenu as Menu } from './Menu.tsx'

export const KulturSettings = ({ asMenu, kulturId }: { asMenu?: boolean; kulturId?: string }) => {
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
          aria-owns={anchorEl ? 'menu' : undefined}
          aria-haspopup="true"
          onClick={onClickConfig as unknown as import('react').MouseEventHandler<HTMLElement>}
        >
          Optionen wählen
        </MenuItem>
        <Menu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          kulturId={kulturId}
        />
      </>
    )
  }

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Optionen wählen"
        aria-owns={anchorEl ? 'menu' : undefined}
        aria-haspopup="true"
        title="Optionen wählen"
        onClick={onClickConfig as unknown as import('react').MouseEventHandler<HTMLElement>}
        size="large"
      >
        <FaCog />
      </IconButton>
      <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} kulturId={kulturId} />
    </ErrorBoundary>
  )
}
