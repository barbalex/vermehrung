import localForage from 'localforage'

export default async ({ store }) => {
  console.log('LOGGING OUT')
  if (typeof window !== 'undefined') {
    localForage.clear()
    window.localStorage.removeItem('token')
    store.firebase.auth().signOut()
    window.location.reload(true)
  }
}
