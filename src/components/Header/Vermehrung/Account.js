import React, { useState, useCallback } from 'react'
import Avatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { FaUserCircle as UserIcon } from 'react-icons/fa'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import axios from 'axios'
import ErrorBoundary from 'react-error-boundary'

import { getProfile, logout } from '../../../utils/auth'

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
  const [anchorEl, setAnchorEl] = useState(null)
  const [resetTitle, setResetTitle] = useState('Passwort zurücksetzen')
  const onClickMenu = useCallback(event => setAnchorEl(event.currentTarget), [])
  const onCloseMenu = useCallback(() => setAnchorEl(null), [])
  const onClickLogout = useCallback(() => {
    setAnchorEl(null)
    logout()
  }, [])

  const user = getProfile()
  const { picture, email } = user

  const onClickReset = useCallback(async () => {
    setResetTitle('...')
    try {
      axios.post(
        `https://${process.env.AUTH0_DOMAIN2}/dbconnections/change_password`,
        {
          client_id: process.env.AUTH0_CLIENTID,
          email,
          connection: 'Username-Password-Authentication',
        },
      )
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
  }, [email])

  //console.log('Account', { user })

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
