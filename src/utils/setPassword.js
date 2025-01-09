import { sendPasswordResetEmail } from 'firebase/auth'

import { constants } from './constants.js'

const setPassword = async ({ store, person }) => {
  const { addNotification, firebaseAuth } = store
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
  store.addNotification({
    message: `${email} erhält einen Link, um ein Passwort zu setzen`,
    type: 'success',
  })
}

export default setPassword
