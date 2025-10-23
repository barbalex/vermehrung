import { useState, useCallback } from 'react'
import Popover from '@mui/material/Popover'
import { MdInfoOutline as InfoOutlineIcon } from 'react-icons/md'
import styled from '@emotion/styled'

const StyledInfoOutlineIcon = styled(InfoOutlineIcon)`
  cursor: pointer;
  pointer-events: auto;
  padding-left: 5px;
`
const StyledPopover = styled(Popover)`
  border-radius: 4px;
`

export const InfoWithPopover = ({ children }) => {
  const [popupOpen, changePopupOpen] = useState(false)
  const [popupAnchorEl, changePopupAnchorEl] = useState(null)

  const onClickFontIcon = useCallback(
    (event) => {
      event.preventDefault()
      changePopupOpen(!popupOpen)
      changePopupAnchorEl(event.currentTarget)
    },
    [popupOpen],
  )
  const onRequestClosePopover = useCallback(() => changePopupOpen(false), [])

  return (
    <>
      <StyledInfoOutlineIcon onClick={onClickFontIcon} />
      <StyledPopover
        open={popupOpen}
        anchorEl={popupAnchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        onClose={onRequestClosePopover}
      >
        {children}
      </StyledPopover>
    </>
  )
}
