import React, { useCallback } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { MdClose as CloseIcon } from 'react-icons/md'
import { useSnackbar } from 'notistack'

const NotifDismisser = ({ nKey }) => {
  const { closeSnackbar } = useSnackbar()
  const onClick = useCallback(() => closeSnackbar(nKey), [closeSnackbar, nKey])

  return (
    <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      onClick={onClick}
      title="Diese Meldung schliessen"
    >
      <CloseIcon />
    </IconButton>
  )
}

export default NotifDismisser
