import { useState, useContext, useRef } from 'react'
import { observer } from 'mobx-react-lite'
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
import localForage from 'localforage'
import {
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'

import { ErrorBoundary } from './shared/ErrorBoundary.jsx'
import { MobxStoreContext } from '../mobxStoreContext.js'
import { constants } from '../utils/constants.js'

import styles from './Login.module.css'

export const Login = observer(() => {
  const { db, firebaseAuth } = useContext(MobxStoreContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [emailErrorText, setEmailErrorText] = useState('')
  const [passwordErrorText, setPasswordErrorText] = useState('')

  const emailInput = useRef(null)
  const passwordInput = useRef(null)

  // callbacks pass email or password
  // because state is not up to date yet
  const fetchLogin = async ({
    email: emailPassed,
    password: passwordPassed,
  }) => {
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
  }
  const onBlurEmail = (e) => {
    setEmailErrorText('')
    const email = e.target.value
    setEmail(email)
    if (!email) {
      setEmailErrorText('Bitte Email-Adresse eingeben')
    } else if (password) {
      fetchLogin({ email })
    }
  }
  const onBlurPassword = (e) => {
    setPasswordErrorText('')
    const password = e.target.value
    setPassword(password)
    if (!password) {
      setPasswordErrorText('Bitte Passwort eingeben')
    } else if (email) {
      fetchLogin({ password })
    }
  }
  const onKeyPressEmail = (e) => e.key === 'Enter' && onBlurEmail(e)
  const onKeyPressPassword = (e) => e.key === 'Enter' && onBlurPassword(e)
  const onClickShowPass = () => setShowPass(!showPass)
  const onMouseDownShowPass = (e) => e.preventDefault()

  const [resetTitle, setResetTitle] = useState('neues Passwort setzen')
  const reset = async () => {
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
  }

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <Dialog
          aria-labelledby="dialog-title"
          open={true}
        >
          <DialogTitle id="dialog-title">Anmeldung</DialogTitle>
          <div className={styles.div}>
            <FormControl
              error={!!emailErrorText}
              fullWidth
              aria-describedby="emailHelper"
              variant="standard"
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                className={`user-email ${styles.input}`}
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
              <Input
                id="passwort"
                className={`user-passwort ${styles.input}`}
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
          </div>
          <DialogActions>
            {!!email && (
              <Button
                onClick={reset}
                color="inherit"
                className={styles.resetButton}
              >
                {resetTitle}
              </Button>
            )}
            <Button
              color="primary"
              onClick={fetchLogin}
            >
              anmelden
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ErrorBoundary>
  )
})
