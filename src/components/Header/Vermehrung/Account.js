import React, { useState, useCallback, useContext, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { FaUserCircle as UserIcon } from 'react-icons/fa'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../storeContext'
import ErrorBoundary from '../../shared/ErrorBoundary'
import logout from '../../../utils/logout'
import getConstants from '../../../utils/constants'
import personFullname from '../../../utils/personFullname'

const constants = getConstants()

const StyledUserIcon = styled(UserIcon)`
  color: white;
`

const Account = () => {
  const store = useContext(StoreContext)
  const { user, firebase, online, db } = store

  const [userPerson, setUserPerson] = useState(undefined)
  useEffect(() => {
    const userPersonObservable = user.uid
      ? db
          .get('person')
          .query(Q.where('account_id', user.uid))
          .observeWithColumns(['vorname', 'name'])
      : $of({})
    const subscription = userPersonObservable.subscribe(([userPerson]) =>
      setUserPerson(userPerson),
    )

    return () => subscription.unsubscribe()
  }, [db, user])

  const [anchorEl, setAnchorEl] = useState(null)
  const [resetTitle, setResetTitle] = useState('Passwort zurücksetzen')
  const onClickMenu = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )
  const onCloseMenu = useCallback(() => setAnchorEl(null), [])

  const onClickLogout = useCallback(async () => {
    setAnchorEl(null)
    logout({ store })
  }, [store])

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
        </Menu>
      </>
    </ErrorBoundary>
  )
}

export default observer(Account)
