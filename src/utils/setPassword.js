import { sendPasswordResetEmail } from 'firebase/auth'

import { store, addNotification, firebaseAuthAtom } from '../store/index.js'
import { constants } from './constants.js'

export const setPassword = async ({ person }) => {
  const firebaseAuth = store.get(firebaseAuthAtom)
  // fetch email of this person
  const email = person?.email
  try {
    await sendPasswordResetEmail(firebaseAuth, email, {
      url: `${constants?.getAppUri()}/Vermehrung`,
      handleCodeInApp: true,
    })
  } catch (error) {
    addNotification({
      message: error.message,
    })
  }
  addNotification({
    message: `${email} erhält einen Link, um ein Passwort zu setzen`,
    type: 'success',
  })
}
