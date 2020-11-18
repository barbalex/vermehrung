import React, { useState, useCallback, useContext, useRef } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import localForage from 'localforage'

import ErrorBoundary from './shared/ErrorBoundary'
import { StoreContext } from '../models/reactUtils'
import getConstants from '../utils/constants'

const constants = getConstants()

const StyledDialog = styled(Dialog)``
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
`
const StyledInput = styled(Input)`
  &:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
`
const ResetButton = styled(Button)`
  text-transform: none !important;
  font-weight: 400 !important;
  margin-left: 8px !important;
  margin-right: 20px !important;
`

const Login = () => {
  const { firebase, flushData } = useContext(StoreContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [emailErrorText, setEmailErrorText] = useState('')
  const [passwordErrorText, setPasswordErrorText] = useState('')

  const emailInput = useRef(null)
  const passwordInput = useRef(null)

  const fetchLogin = useCallback(
    // callbacks pass email or password
    // because state is not up to date yet
    async ({ email: emailPassed, password: passwordPassed }) => {
      // need to fetch values from ref
      // why? password-managers enter values but do not blur/change
      // if password-manager enters values and user clicks "Anmelden"
      // it will not work without previous blurring
      const emailToUse = emailPassed || email || emailInput.current.value
      const passwordToUse =
        passwordPassed || password || passwordInput.current.value
      console.log('Login, fetchLogin', {
        emailToUse,
        emailPassed,
        email,
        emailRefValue: emailInput.current.value,
        passwordToUse,
        passwordPassed,
        password,
        passwordRefValue: passwordInput.current.value,
      })
      // do everything to clean up so no data is left
      await firebase.auth().signOut()
      localForage.clear()
      window.localStorage.removeItem('token')
      flushData()
      setTimeout(async () => {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(emailToUse, passwordToUse)
        } catch (error) {
          setEmailErrorText(error.message)
          return setPasswordErrorText(error.message)
        }
        setTimeout(() => window.location.reload(true))
      })
    },
    [email, firebase, flushData, password],
  )
  const onBlurEmail = useCallback(
    (e) => {
      setEmailErrorText('')
      const email = e.target.value
      setEmail(email)
      if (!email) {
        setEmailErrorText('Bitte Email-Adresse eingeben')
      } else if (password) {
        fetchLogin({ email })
      }
    },
    [fetchLogin, password],
  )
  const onBlurPassword = useCallback(
    (e) => {
      setPasswordErrorText('')
      const password = e.target.value
      setPassword(password)
      if (!password) {
        setPasswordErrorText('Bitte Passwort eingeben')
      } else if (email) {
        fetchLogin({ password })
      }
    },
    [fetchLogin, email],
  )
  const onKeyPressEmail = useCallback(
    (e) => e.key === 'Enter' && onBlurEmail(e),
    [onBlurEmail],
  )
  const onKeyPressPassword = useCallback(
    (e) => e.key === 'Enter' && onBlurPassword(e),
    [onBlurPassword],
  )
  const onClickShowPass = useCallback(() => setShowPass(!showPass), [showPass])
  const onMouseDownShowPass = useCallback((e) => e.preventDefault(), [])

  const [resetTitle, setResetTitle] = useState('neues Passwort setzen')
  const reset = useCallback(async () => {
    if (!email) setEmailErrorText('Bitte Email-Adresse eingeben')
    setResetTitle('...')
    try {
      await firebase.auth().sendPasswordResetEmail(email, {
        url: `${constants?.appUri}/Vermehrung`,
        handleCodeInApp: true,
      })
    } catch (error) {
      setResetTitle('Fehler: Passwort nicht zurückgesetzt')
      setTimeout(() => {
        setResetTitle('neues Passwort setzen')
      }, 5000)
    }
    setResetTitle('Email ist unterwegs!')
    setTimeout(() => {
      setResetTitle('neues Passwort setzen')
    }, 5000)
  }, [email, firebase])

  return (
    <ErrorBoundary>
      <StyledDialog aria-labelledby="dialog-title" open={true}>
        <DialogTitle id="dialog-title">Anmeldung</DialogTitle>
        <StyledDiv>
          <FormControl
            error={!!emailErrorText}
            fullWidth
            aria-describedby="emailHelper"
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <StyledInput
              id="email"
              className="user-email"
              defaultValue={email}
              onBlur={onBlurEmail}
              autoFocus
              onKeyPress={onKeyPressEmail}
              ref={emailInput}
            />
            <FormHelperText id="emailHelper">{emailErrorText}</FormHelperText>
          </FormControl>
          <FormControl
            error={!!passwordErrorText}
            fullWidth
            aria-describedby="passwortHelper"
          >
            <InputLabel htmlFor="passwort">Passwort</InputLabel>
            <StyledInput
              id="passwort"
              className="user-passwort"
              type={showPass ? 'text' : 'password'}
              defaultValue={password}
              onBlur={onBlurPassword}
              onKeyPress={onKeyPressPassword}
              autoComplete="current-password"
              autoCorrect="off"
              spellCheck="false"
              ref={passwordInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={onClickShowPass}
                    onMouseDown={onMouseDownShowPass}
                    title={showPass ? 'verstecken' : 'anzeigen'}
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="passwortHelper">
              {passwordErrorText}
            </FormHelperText>
          </FormControl>
        </StyledDiv>
        <DialogActions>
          {!!email && <ResetButton onClick={reset}>{resetTitle}</ResetButton>}
          <Button color="primary" onClick={fetchLogin}>
            anmelden
          </Button>
        </DialogActions>
      </StyledDialog>
    </ErrorBoundary>
  )
}

export default Login
