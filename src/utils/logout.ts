import localForage from 'localforage'
import { signOut } from 'firebase/auth'

import {
  store,
  dbAtom,
  firebaseAuthAtom,
  resetSyncState,
} from '../store/index.ts'

export const logout = async () => {
  console.log('logout called')
  const db = store.get(dbAtom)
  const firebaseAuth = store.get(firebaseAuthAtom)
  console.log('LOGGING OUT')
  if (firebaseAuth) await signOut(firebaseAuth)
  await localForage.clear()
  resetSyncState()
  if (db) await db.write(async () => db.unsafeResetDatabase())
  window.localStorage.removeItem('token')
  window.location.reload()
}
