import localForage from 'localforage'

import { store, dbAtom } from '../store/index.js'

export const reloadData = async () => {
  const db = store.get(dbAtom)

  await localForage.clear()
  await db.write(async () => db.unsafeResetDatabase())
  window.localStorage.removeItem('token')
  window.location.reload(true)
}
