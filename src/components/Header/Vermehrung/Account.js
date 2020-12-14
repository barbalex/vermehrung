import React, { useState, useCallback, useContext, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { FaUserCircle as UserIcon } from 'react-icons/fa'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'
import logout from '../../../utils/logout'
import getConstants from '../../../utils/constants'
import getUserPerson from '../../../utils/getUserPerson'
import personFullname from '../../../utils/personFullname'

const constants = getConstants()

const StyledUserIcon = styled(UserIcon)`
  color: white;
`
const Line = styled.hr`
  background: rgba(74, 20, 140, 0.3) !important;
  margin: 5px 0;
`
const StyledMenuItem = styled(MenuItem)`
  ${(props) => props['data-active'] === 'yes' && 'font-style: italic;'}
  ${(props) =>
    props['data-active'] === 'yes' &&
    'animation: flickerAnimation 1s infinite;'}
  @keyframes flickerAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const Account = () => {
  const store = useContext(StoreContext)

  const { user, firebase, flushData, online, db } = store

  const [userPerson, setUserPerson] = useState(undefined)
  useEffect(() => {
    getUserPerson({ user, db }).then((userPerson) => setUserPerson(userPerson))
  }, [db, user])

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
    flushData()
  }, [firebase, flushData])

  const { email } = user || {}

  const onClickResetPassword = useCallback(async () => {
    setResetTitle('...')
    try {
      await firebase.auth().sendPasswordResetEmail(email, {
        url: `${constants?.appUri}/Vermehrung`,
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
  const onClickLogoutAndClear = useCallback(() => {
    logout({ store })
  }, [store])

  const [refreshing, setRefreshing] = useState('no')
  const onClickRefresh = useCallback(async () => {
    setRefreshing('yes')
    flushData()
    window.location.reload(true)
  }, [flushData])
  const refreshText =
    refreshing === 'no'
      ? 'Daten neu laden'
      : refreshing === 'yes'
      ? 'Entferne lokale Daten...'
      : 'Die Daten wurden neu geladen'

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
          <Line />
          <StyledMenuItem
            onClick={onClickRefresh}
            data-id="appbar-more-logout"
            data-active={refreshing}
          >
            {refreshText}
          </StyledMenuItem>
          <MenuItem
            onClick={onClickLogoutAndClear}
            data-id="appbar-more-logout"
          >
            Daten neu laden plus: Einstellungen und Anmeldung zurücksetzen
          </MenuItem>
        </Menu>
      </>
    </ErrorBoundary>
  )
}

export default observer(Account)
