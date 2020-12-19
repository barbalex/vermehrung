import localForage from 'localforage'

const logout = async ({ store }) => {
  const { db } = store
  console.log('LOGGING OUT')
  if (typeof window !== 'undefined') {
    await store.firebase.auth().signOut()
    await localForage.clear()
    await db.action(async () => db.unsafeResetDatabase())
    window.localStorage.removeItem('token')
    window.location.reload(true)
  }
}

export default logout
