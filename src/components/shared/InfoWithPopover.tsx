import { useState } from 'react'
import Popover from '@mui/material/Popover'
import { MdInfoOutline as InfoOutlineIcon } from 'react-icons/md'

import type { ReactNode } from 'react'

import styles from './InfoWithPopover.module.css'

export const InfoWithPopover = ({ children }: { children: ReactNode }) => {
  const [popupOpen, changePopupOpen] = useState(false)
  const [popupAnchorEl, changePopupAnchorEl] = useState<Element | null>(null)

  const onClickFontIcon = (event: {
    preventDefault: () => void
    currentTarget: Element
  }) => {
    event.preventDefault()
    changePopupOpen(!popupOpen)
    changePopupAnchorEl(event.currentTarget)
  }

  const onRequestClosePopover = () => changePopupOpen(false)

  return (
    <>
      <InfoOutlineIcon
        onClick={onClickFontIcon}
        className={styles.infoOutlineIcon}
      />
      <Popover
        open={popupOpen}
        anchorEl={popupAnchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        onClose={onRequestClosePopover}
        className={styles.popover}
      >
        {children}
      </Popover>
    </>
  )
}
