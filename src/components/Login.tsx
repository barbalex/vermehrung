import { useState, useRef } from 'react'
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

import { ErrorBoundary } from './shared/ErrorBoundary.tsx'
import { dbAtom, firebaseAuthAtom, resetSyncState, store } from '../store/index.ts'
import { constants } from '../utils/constants.ts'

import styles from './Login.module.css'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [emailErrorText, setEmailErrorText] = useState('')
  const [passwordErrorText, setPasswordErrorText] = useState('')

  const emailInput = useRef<HTMLInputElement | null>(null)
  const passwordInput = useRef<HTMLInputElement | null>(null)

  // callbacks pass email or password
  // because state is not up to date yet
  const fetchLogin = async ({
    email: emailPassed,
    password: passwordPassed,
  }: {
    email?: string
    password?: string
  }) => {
    const db = store.get(dbAtom)
    const firebaseAuth = store.get(firebaseAuthAtom)
    // need to fetch values from ref
    // why? password-managers enter values but do not blur/change
    // if password-manager enters values and user clicks "Anmelden"
    // it will not work without previous blurring
    const emailToUse =
      emailPassed || email || emailInput.current?.value || ''
    const passwordToUse =
      passwordPassed || password || passwordInput.current?.value || ''
    // do everything to clean up so no data is left
    if (firebaseAuth) await signOut(firebaseAuth)
    await localForage.clear()
    window.localStorage.removeItem('token')
    resetSyncState()
    if (db) await db.write(async () => db.unsafeResetDatabase())
    setTimeout(async () => {
      try {
        if (!firebaseAuth) return
        await signInWithEmailAndPassword(firebaseAuth, emailToUse, passwordToUse)
      } catch (error) {
        setEmailErrorText((error as Error).message)
        return setPasswordErrorText((error as Error).message)
      }
      // 2020.12.19 trying to go without reloading
      //setTimeout(() => window.location.reload(true))
    })
  }
  const onBlurEmail = (e: { target: { value: string } }) => {
    setEmailErrorText('')
    const email = e.target.value
    setEmail(email)
    if (!email) {
      setEmailErrorText('Bitte Email-Adresse eingeben')
    } else if (password) {
      fetchLogin({ email })
    }
  }
  const onBlurPassword = (e: { target: { value: string } }) => {
    setPasswordErrorText('')
    const password = e.target.value
    setPassword(password)
    if (!password) {
      setPasswordErrorText('Bitte Passwort eingeben')
    } else if (email) {
      fetchLogin({ password })
    }
  }
  const onKeyPressEmail = (e: { key: string; target: { value: string } }) =>
    e.key === 'Enter' && onBlurEmail(e)
  const onKeyPressPassword = (e: {
    key: string
    target: { value: string }
  }) =>
    e.key === 'Enter' && onBlurPassword(e)
  const onClickShowPass = () => setShowPass(!showPass)
  const onMouseDownShowPass = (e: { preventDefault: () => void }) =>
    e.preventDefault()

  const [resetTitle, setResetTitle] = useState('neues Passwort setzen')
  const reset = async () => {
    const firebaseAuth = store.get(firebaseAuthAtom)
    // need to fetch value from ref
    // why? password-managers enter values but do not blur/change
    const emailToUse = email || emailInput.current?.value
    if (!emailToUse) {
      setEmailErrorText('Bitte Email-Adresse eingeben')
      return
    }
    setResetTitle('...')
    try {
      if (!firebaseAuth) return
      await sendPasswordResetEmail(firebaseAuth, emailToUse, {
        url: `${constants?.getAppUri()}/Vermehrung`,
        handleCodeInApp: true,
      })
    } catch {
      setResetTitle('Fehler: Passwort nicht zurückgesetzt')
      setTimeout(() => {
        setResetTitle('neues Passwort setzen')
      }, 5000)
      return
    }
    setResetTitle('Email ist unterwegs!')
    setTimeout(() => {
      setResetTitle('neues Passwort setzen')
    }, 5000)
  }

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <Dialog aria-labelledby="dialog-title" open={true}>
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
                onKeyPress={
          onKeyPressEmail as unknown as import('react').KeyboardEventHandler
        }
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
                onKeyPress={
          onKeyPressPassword as unknown as import('react').KeyboardEventHandler
        }
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
                      {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
            <Button
              onClick={reset}
              color="inherit"
              className={styles.resetButton}
            >
              {resetTitle}
            </Button>
            <Button color="primary" onClick={() => void fetchLogin({})}>
              anmelden
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ErrorBoundary>
  )
}
