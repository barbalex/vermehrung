import localForage from 'localforage'
import { signOut } from 'firebase/auth'

const logout = async ({ store }) => {
  const { db, firebaseAuth } = store
  console.log('LOGGING OUT')
  if (typeof window !== 'undefined') {
    await signOut(firebaseAuth)
    await localForage.clear()
    await db.write(async () => db.unsafeResetDatabase())
    window.localStorage.removeItem('token')
    window.location.reload(true)
  }
}

export default logout
