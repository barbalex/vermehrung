import localForage from 'localforage'

export default async ({ store }) => {
  console.log('LOGGING OUT')
  if (typeof window !== 'undefined') {
    store.firebase.auth().signOut()
    localForage.clear()
    window.localStorage.removeItem('token')
    window.location.reload(true)
  }
}
