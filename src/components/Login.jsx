import React, { useState, useCallback, useContext, useRef } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import {
  MdVisibility as VisibilityIcon,
  MdVisibilityOff as VisibilityOffIcon,
} from 'react-icons/md'
import Button from '@mui/material/Button'
import styled from '@emotion/styled'
import localForage from 'localforage'
import {
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'

import { ErrorBoundary } from './shared/ErrorBoundary.jsx'
import { MobxStoreContext } from '../mobxStoreContext.js'
import { constants } from '../utils/constants.js'

const Container = styled.div`
  margin: 20px;
`
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

export const Login = () => {
  const { db, firebaseAuth } = useContext(MobxStoreContext)

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
      // do everything to clean up so no data is left
      await signOut(firebaseAuth)
      await localForage.clear()
      window.localStorage.removeItem('token')
      await db.write(async () => db.unsafeResetDatabase())
      setTimeout(async () => {
        try {
          await signInWithEmailAndPassword(
            firebaseAuth,
            emailToUse,
            passwordToUse,
          )
        } catch (error) {
          setEmailErrorText(error.message)
          return setPasswordErrorText(error.message)
        }
        // 2020.12.19 trying to go without reloading
        //setTimeout(() => window.location.reload(true))
      })
    },
    [db, email, password, firebaseAuth],
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
      await sendPasswordResetEmail(firebaseAuth, email, {
        url: `${constants?.getAppUri()}/Vermehrung`,
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
  }, [email, firebaseAuth])

  return (
    <ErrorBoundary>
      <Container>
        <StyledDialog
          aria-labelledby="dialog-title"
          open={true}
        >
          <DialogTitle id="dialog-title">Anmeldung</DialogTitle>
          <StyledDiv>
            <FormControl
              error={!!emailErrorText}
              fullWidth
              aria-describedby="emailHelper"
              variant="standard"
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <StyledInput
                id="email"
                className="user-email"
                defaultValue={email}
                onBlur={onBlurEmail}
                autoFocus
                onKeyPress={onKeyPressEmail}
                inputRef={emailInput}
              />
              <FormHelperText id="emailHelper">{emailErrorText}</FormHelperText>
            </FormControl>
            <FormControl
              error={!!passwordErrorText}
              fullWidth
              aria-describedby="passwortHelper"
              variant="standard"
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
                inputRef={passwordInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={onClickShowPass}
                      onMouseDown={onMouseDownShowPass}
                      title={showPass ? 'verstecken' : 'anzeigen'}
                      size="large"
                    >
                      {showPass ?
                        <VisibilityOffIcon />
                      : <VisibilityIcon />}
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
            {!!email && (
              <ResetButton
                onClick={reset}
                color="inherit"
              >
                {resetTitle}
              </ResetButton>
            )}
            <Button
              color="primary"
              onClick={fetchLogin}
            >
              anmelden
            </Button>
          </DialogActions>
        </StyledDialog>
      </Container>
    </ErrorBoundary>
  )
}
