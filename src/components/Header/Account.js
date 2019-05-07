import React, { useState, useCallback, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { FaUserCircle as UserIcon } from 'react-icons/fa'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

//import Signup from './Signup'
//import Login from './Login'
import ErrorBoundary from '../ErrorBoundary'
import storeContext from '../../storeContext'
import { getProfile, logout } from '../../utils/auth'

const IconContainer = styled.div`
  position: relative;
  padding-left: 10px;
`
const UserNameDiv = styled.div`
  position: absolute;
  bottom: 0;
  font-size: 10px;
  width: 60px;
  left: 5px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  /* ensure cursor is not changed */
  z-index: -1;
`
const StyledAvatar = styled(Avatar)`
  height: 1.6em !important;
  width: 1.6em !important;
  cursor: pointer;
  img {
    margin-top: 1.4em;
  }
`
const StyledUserIcon = styled(UserIcon)`
  height: 1.6em;
  width: 1.6em;
`

const Account = () => {
  const store = useContext(storeContext)
  const { email /*, signupOpen, loginOpen*/ } = store
  const [anchorEl, setAnchorEl] = useState(null)
  const onClickMenu = useCallback(event => setAnchorEl(event.currentTarget), [])
  const onCloseMenu = useCallback(() => setAnchorEl(null), [])
  const onClickSignup = useCallback(() => {
    setAnchorEl(null)
    console.log('TODO')
    // authState.setSignupOpen(!signupOpen)
  }, [])
  const onClickLogout = useCallback(() => {
    setAnchorEl(null)
    logout()
  }, [])

  const user = getProfile()
  const { picture } = user
  console.log('Account', { user, picture })

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

          <UserNameDiv>{email || ''}</UserNameDiv>
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
          <MenuItem onClick={onClickSignup}>Konto erstellen</MenuItem>
        </Menu>
      </>
    </ErrorBoundary>
  )
}

export default observer(Account)
