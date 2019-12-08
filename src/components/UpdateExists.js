import React, { useContext, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { observer } from 'mobx-react-lite'
import localForage from 'localforage'

import storeContext from '../storeContext'

const UpdateExist = () => {
  const store = useContext(storeContext)
  const { updateExists, setUpdateExists } = store

  const onClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      setUpdateExists(false)
      // clear local storage in case db structure was changed
      localForage.clear()
      window.location.reload(true)
    }
  }, [setUpdateExists])

  return (
    <Dialog
      open={updateExists}
      onClose={onClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Es gibt eine neue Version von vermehrung
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Vermehrung muss neu gestartet werden, um die neue Version zu
          installieren.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClick} color="primary" autoFocus>
          Neu starten
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default observer(UpdateExist)
