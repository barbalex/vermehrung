import { sendPasswordResetEmail } from 'firebase/auth'

import { store, addNotification, firebaseAuthAtom } from '../store/index.ts'
import { constants } from './constants.ts'

export const setPassword = async ({
  person,
}: {
  person: { email?: string | null } | null
}) => {
  const firebaseAuth = store.get(firebaseAuthAtom)
  // fetch email of this person
  const email = person?.email
  try {
    if (!firebaseAuth) return
    await sendPasswordResetEmail(firebaseAuth, email ?? undefined, {
      url: `${constants?.getAppUri()}/Vermehrung`,
      handleCodeInApp: true,
    })
  } catch (error) {
    addNotification({
      message: (error as Error).message,
    })
  }
  addNotification({
    message: `${email} erhält einen Link, um ein Passwort zu setzen`,
    type: 'success',
  })
}
