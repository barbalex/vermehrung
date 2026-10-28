import { useState } from 'react'
import IconButton from '@mui/material/IconButton'

import MenuItem from '@mui/material/MenuItem'
import { MdMenu } from 'react-icons/md'

import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'
import { HeaderHamburgerMenu as Menu } from './Menu.tsx'

import styles from './index.module.css'

export const HeaderHamburgerMenu = ({
  asMenu,
}: {
  asMenu?: boolean
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined | null>(null)
  const onClickMenu = (event: { currentTarget: HTMLElement }) =>
    setAnchorEl(event.currentTarget)

  if (asMenu) {
    return (
      <>
        <MenuItem
          aria-owns={anchorEl ? 'menu' : undefined}
          aria-haspopup="true"
          onClick={onClickMenu}
        >
          Menu
        </MenuItem>
        <Menu
          anchorEl={anchorEl ?? null}
          setAnchorEl={setAnchorEl as (el: HTMLElement | null) => void}
        />
      </>
    )
  }

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Menu"
        aria-owns={anchorEl ? 'menu' : undefined}
        aria-haspopup="true"
        title="Menu"
        onClick={onClickMenu}
        size="large"
      >
        <MdMenu className={styles.icon} />
      </IconButton>
      <Menu
          anchorEl={anchorEl ?? null}
          setAnchorEl={setAnchorEl as (el: HTMLElement | null) => void}
        />
    </ErrorBoundary>
  )
}
