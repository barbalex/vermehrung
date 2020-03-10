import React, { useState, useCallback, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { FaUserCircle as UserIcon } from 'react-icons/fa'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import ErrorBoundary from 'react-error-boundary'
import { useApolloClient } from '@apollo/react-hooks'

import firebaseContext from '../../../firebaseContext'

const IconContainer = styled.div`
  position: relative;
  padding-left: 10px;
`
const StyledAvatar = styled(Avatar)`
  height: 1.6em !important;
  width: 1.6em !important;
  margin-right: 5px;
  margin-left: 5px;
  cursor: pointer;
  img {
    margin-top: 1.15em;
  }
`
const StyledUserIcon = styled(UserIcon)`
  height: 1.6em;
  width: 1.6em;
`

const Account = () => {
  const firebase = useContext(firebaseContext)
  const client = useApolloClient()

  const [anchorEl, setAnchorEl] = useState(null)
  const [resetTitle, setResetTitle] = useState('Passwort zurücksetzen')
  const onClickMenu = useCallback(event => setAnchorEl(event.currentTarget), [])
  const onCloseMenu = useCallback(() => setAnchorEl(null), [])
  const onClickLogout = useCallback(() => {
    setAnchorEl(null)
    firebase.auth().signOut()
    client.resetStore()
  }, [client, firebase])

  const { picture, email } = firebase.auth().currentUser || {}

  const onClickReset = useCallback(async () => {
    setResetTitle('...')
    try {
      await firebase.auth().sendPasswordResetEmail(email)
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
        <IconContainer>
          {picture ? (
            <StyledAvatar
              aria-haspopup="true"
              aria-label="Konto"
              onClick={onClickMenu}
              title="Konto"
              alt="Konto"
              src={picture}
            />
          ) : (
            <StyledAvatar
              aria-haspopup="true"
              aria-label="Konto"
              onClick={onClickMenu}
              title="Konto"
              alt="Konto"
            >
              <StyledUserIcon />
            </StyledAvatar>
          )}
        </IconContainer>
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
