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
  // reset the database FIRST, on an idle app - see the comment in Login.tsx
  // fetchLogin for why the reset must not overlap state churn
  if (db) await db.write(async () => db.unsafeResetDatabase())
  if (firebaseAuth) await signOut(firebaseAuth)
  await localForage.clear()
  resetSyncState()
  window.localStorage.removeItem('token')
  window.location.reload()
}
