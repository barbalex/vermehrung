import React, { useState, useCallback, useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { FaUserCircle as UserIcon } from 'react-icons/fa'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'

const StyledUserIcon = styled(UserIcon)`
  color: white;
`

const Account = () => {
  const store = useContext(StoreContext)

  const { user, firebase } = store

  const [anchorEl, setAnchorEl] = useState(null)
  const [resetTitle, setResetTitle] = useState('Passwort zurücksetzen')
  const onClickMenu = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )
  const onCloseMenu = useCallback(() => setAnchorEl(null), [])
  const onClickLogout = useCallback(() => {
    setAnchorEl(null)
    firebase.auth().signOut()
    // TODO: reset mst-store! How? Action that sets default values?
  }, [firebase])

  const { email } = user || {}

  const onClickReset = useCallback(async () => {
    setResetTitle('...')
    try {
      await firebase.auth().sendPasswordResetEmail(email, {
        url: 'https://vermehrung.ch/Vermehrung',
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
  }, [email, firebase])

  return (
    <ErrorBoundary>
      <>
        <IconButton
          aria-label="Konto"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          title="Konto"
          onClick={onClickMenu}
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
          <MenuItem onClick={onClickLogout}>Abmelden</MenuItem>
          <MenuItem onClick={onClickReset}>{resetTitle}</MenuItem>
        </Menu>
      </>
    </ErrorBoundary>
  )
}

export default observer(Account)
