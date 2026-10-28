import { useState } from 'react'
import IconButton from '@mui/material/IconButton'

import MenuItem from '@mui/material/MenuItem'
import { MdMenu } from 'react-icons/md'

import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'
import { HeaderHamburgerMenu as Menu } from './Menu.tsx'

import styles from './index.module.css'

export const HeaderHamburgerMenu = ({ asMenu }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined | null>(null)
  const onClickMenu = (event: {
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
        size="large"
      >
        <MdMenu className={styles.icon} />
      </IconButton>
      <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </ErrorBoundary>
  )
}
