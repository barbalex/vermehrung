import { useState } from 'react'
import { FaMinus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'
import { KulturDeleteMenu as Menu } from './Menu.tsx'

export const KulturDeleteButton = ({
  row,
  asMenu,
}: {
  row?: import('../../../../../dbModel.ts').Kultur | null | undefined
  asMenu?: boolean
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined | null>(null)

  const onClickButton = (event: {
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
          aria-haspopup="true"
          onClick={
                  onClickButton as unknown as import('react').MouseEventHandler
                }
          disabled={!!row?._deleted}
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
        onClick={
                  onClickButton as unknown as import('react').MouseEventHandler
                }
        disabled={!!row?._deleted}
        size="large"
      >
        <FaMinus />
      </IconButton>
      <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} row={row} />
    </ErrorBoundary>
  )
}
