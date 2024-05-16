import React, { useState, useCallback, useContext, useEffect } from 'react'
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
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'
import { sendPasswordResetEmail } from 'firebase/auth'

import StoreContext from '../../../storeContext.js'
import ErrorBoundary from '../../shared/ErrorBoundary.jsx'
import logout from '../../../utils/logout'
import constants from '../../../utils/constants'
import personFullname from '../../../utils/personFullname'

const StyledUserIcon = styled(UserIcon)`
  color: white;
`
const StyledButton = styled(Button)`
  text-transform: none !important;
`
const RiskyButton = styled(Button)`
  text-transform: none !important;
  color: #d84315 !important;
  border-color: #d84315 !important;
`

const Account = () => {
  const store = useContext(StoreContext)
  const { user, online, db, queuedQueries, firebaseAuth } = store

  const [userPerson, setUserPerson] = useState(undefined)
  useEffect(() => {
    const userPersonObservable = user.uid
      ? db
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
  const onClickMenu = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )
  const onCloseMenu = useCallback(() => setAnchorEl(null), [])

  const [pendingOperationsDialogOpen, setPendingOperationsDialogOpen] =
    useState(false)
  const onClickLogout = useCallback(async () => {
    setAnchorEl(null)
    // TODO:
    // if exist pending operations
    // ask user if willing to loose them
    if (queuedQueries.size) {
      return setPendingOperationsDialogOpen(true)
    }
    logout({ store })
  }, [queuedQueries.size, store])

  const { email } = user || {}

  const onClickResetPassword = useCallback(async () => {
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
  }, [email, firebaseAuth])

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
          <StyledUserIcon />
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
            <StyledButton
              onClick={() => setPendingOperationsDialogOpen(false)}
              color="primary"
              autoFocus
              variant="outlined"
            >
              Ich bleibe angemeldet, um die ausstehenden Operationen nicht zu
              verlieren
            </StyledButton>
            <RiskyButton
              onClick={() => {
                setPendingOperationsDialogOpen(false)
                logout({ store })
              }}
              variant="outlined"
              startIcon={<FaExclamationCircle />}
            >
              Ich will abmelden, obwohl ich die ausstehenden Operationen
              verliere
            </RiskyButton>
          </DialogActions>
        </Dialog>
      </>
    </ErrorBoundary>
  )
}

export default observer(Account)
