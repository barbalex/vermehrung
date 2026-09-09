import localForage from 'localforage'
import { signOut } from 'firebase/auth'

import { store, dbAtom, firebaseAuthAtom } from '../store/index.js'

export const logout = async () => {
  console.log('logout called')
  const db = store.get(dbAtom)
  const firebaseAuth = store.get(firebaseAuthAtom)
  console.log('LOGGING OUT')
  await signOut(firebaseAuth)
  await localForage.clear()
  await db.write(async () => db.unsafeResetDatabase())
  window.localStorage.removeItem('token')
  window.location.reload(true)
}
