import localForage from 'localforage'
import { signOut } from 'firebase/auth'

export const logout = async ({ store }) => {
  const { db, firebaseAuth } = store
  console.log('LOGGING OUT')
  await signOut(firebaseAuth)
  await localForage.clear()
  await db.write(async () => db.unsafeResetDatabase())
  window.localStorage.removeItem('token')
  window.location.reload(true)
}

