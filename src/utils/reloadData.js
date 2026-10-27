import localForage from 'localforage'

import { store, dbAtom, resetSyncState } from '../store/index.js'

export const reloadData = async () => {
  const db = store.get(dbAtom)

  await localForage.clear()
  resetSyncState()
    await db.write(async () => db.unsafeResetDatabase())
  window.localStorage.removeItem('token')
  window.location.reload(true)
}
