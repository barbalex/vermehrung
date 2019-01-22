import React, { useState, useCallback, useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { FaUserCircle as UserIcon } from 'react-icons/fa'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

//import Signup from './Signup'
//import Login from './Login'
import ErrorBoundary from '../ErrorBoundary'
import storeContext from '../../storeContext'

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
  const onClickLogin = useCallback(() => {
    setAnchorEl(null)
    console.log('TODO')
    // authState.setLoginOpen(!loginOpen)
  }, [])
  const onClickLogout = useCallback(() => {
    setAnchorEl(null)
    console.log('TODO')
    // authState.logOut()
  }, [])

  return (
    <ErrorBoundary>
      <>
        <IconContainer>
          <IconButton
            aria-haspopup="true"
            aria-label="Konto"
            onClick={onClickMenu}
            color="inherit"
            title="Konto"
          >
            <UserIcon />
          </IconButton>
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
          {!email && <MenuItem onClick={onClickLogin}>Anmelden</MenuItem>}
          {email && <MenuItem onClick={onClickLogout}>Abmelden</MenuItem>}
          <MenuItem onClick={onClickSignup}>Konto erstellen</MenuItem>
        </Menu>
        {/*signupOpen && <Signup />*/}
        {/*loginOpen && <Login />*/}
      </>
    </ErrorBoundary>
  )
}

export default observer(Account)
