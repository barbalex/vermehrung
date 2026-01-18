import { useState, useContext, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FaUserCircle as UserIcon, FaExclamationCircle } from 'react-icons/fa'
import { observer } from 'mobx-react-lite'
import { of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'
import { reload, sendPasswordResetEmail } from 'firebase/auth'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { logout } from '../../../utils/logout.js'
import { reloadData } from '../../../utils/reloadData.js'
import { constants } from '../../../utils/constants.js'
import { personFullname } from '../../../utils/personFullname.js'

import styles from './Account.module.css'

const Account = () => {
  const store = useContext(MobxStoreContext)
  const { user, online, db, queuedQueries, firebaseAuth } = store

  const [userPerson, setUserPerson] = useState(undefined)
  useEffect(() => {
    const userPersonObservable =
      user.uid ?
        db
          .get('person')
          .query(Q.where('account_id', user.uid))
          .observeWithColumns(['vorname', 'name'])
      : $of({})
    const subscription = userPersonObservable.subscribe((result) => {
      const userPerson = result?.[0]
      return setUserPerson(userPerson)
    })

    return () => subscription?.unsubscribe?.()
  }, [db, user])

  const [anchorEl, setAnchorEl] = useState(null)
  const [resetTitle, setResetTitle] = useState('Passwort zurücksetzen')

  const onClickMenu = (event) => setAnchorEl(event.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const [pendingOperationsDialogOpen, setPendingOperationsDialogOpen] =
    useState(false)
  const onClickLogout = () => {
    setAnchorEl(null)
    // if exist pending operations
    // ask user if willing to loose them
    if (queuedQueries.size) {
      return setPendingOperationsDialogOpen(true)
    }
    logout({ store })
  }

  const [reloadDataDialogOpen, setReloadDataDialogOpen] = useState(false)
  const onClickReloadData = () => {
    setAnchorEl(null)
    // if exist pending operations
    // ask user if willing to loose them
    if (queuedQueries.size) {
      return setReloadDataDialogOpen(true)
    }
    reloadData({ store })
  }

  const { email } = user || {}

  const onClickResetPassword = async () => {
    setResetTitle('...')
    try {
      await sendPasswordResetEmail(firebaseAuth, email, {
        url: `${constants?.getAppUri()}/Vermehrung`,
        handleCodeInApp: true,
      })
    } catch (error) {
      setResetTitle('Fehler: Passwort nicht zurückgesetzt')
      setTimeout(() => {
        setResetTitle('Passwort zurücksetzen')
        setAnchorEl(null)
      }, 5000)
    }
    setResetTitle('Email ist unterwegs!')
    setTimeout(() => {
      setResetTitle('Passwort zurücksetzen')
      setAnchorEl(null)
    }, 5000)
  }

  if (!online) return null

  return (
    <ErrorBoundary>
      <>
        <IconButton
          aria-label="Konto"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          title={`Konto und Daten verwalten`}
          onClick={onClickMenu}
          size="large"
        >
          <UserIcon className={styles.userIcon} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={!!anchorEl}
          onClose={onCloseMenu}
        >
          <MenuItem onClick={onClickLogout}>{`${
            personFullname(userPerson) ?? ''
          } abmelden`}</MenuItem>
          <MenuItem onClick={onClickResetPassword}>{resetTitle}</MenuItem>
          <MenuItem onClick={onClickReloadData}>
            Lokale Daten verwerfen, dann vom Server neu laden
          </MenuItem>
        </Menu>
        <Dialog
          open={pendingOperationsDialogOpen}
          onClose={() => setPendingOperationsDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
        >
          <DialogTitle id="alert-dialog-title">
            {'Wirklich abmelden?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Beim Abmelden werden aus Datenschutzgründen alle lokalen Daten
              entfernt. Es gibt noch ${queuedQueries.size} ausstehende
              Operationen. Wenn Sie jetzt abmelden, gehen diese verloren.
              Vermutlich warten Sie besser, bis diese Operationen an den Server
              übermittelt wurden.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setPendingOperationsDialogOpen(false)}
              color="primary"
              autoFocus
              variant="outlined"
              className={styles.button}
            >
              Ich bleibe angemeldet, um die ausstehenden Operationen nicht zu
              verlieren
            </Button>
            <Button
              onClick={() => {
                setPendingOperationsDialogOpen(false)
                logout({ store })
              }}
              variant="outlined"
              startIcon={<FaExclamationCircle />}
              className={styles.riskyButton}
            >
              Ich will abmelden, obwohl ich die ausstehenden Operationen
              verliere
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={reloadDataDialogOpen}
          onClose={() => setReloadDataDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
        >
          <DialogTitle id="alert-dialog-title">{'Wirklich?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Es gibt noch ${queuedQueries.size} ausstehende
              Operationen. Wenn Sie jetzt die Daten verwerfen und neu laden, gehen diese verloren.
              Vermutlich warten Sie besser, bis diese Operationen an den Server
              übermittelt wurden.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setReloadDataDialogOpen(false)}
              color="primary"
              autoFocus
              variant="outlined"
              className={styles.button}
            >
              Ich verzichte, um die ausstehenden Operationen nicht zu verlieren
            </Button>
            <Button
              onClick={() => {
                setReloadDataDialogOpen(false)
                reloadData({ store })
              }}
              variant="outlined"
              startIcon={<FaExclamationCircle />}
              className={styles.riskyButton}
            >
              Ich lade die Daten neu, obwohl ich die ausstehenden Operationen
              verliere
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </ErrorBoundary>
  )
}

export default observer(Account)
