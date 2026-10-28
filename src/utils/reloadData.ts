import localForage from 'localforage'

import { store, dbAtom, resetSyncState } from '../store/index.ts'

export const reloadData = async () => {
  const db = store.get(dbAtom)

  await localForage.clear()
  resetSyncState()
  if (db) await db.write(async () => db.unsafeResetDatabase())
  window.localStorage.removeItem('token')
  window.location.reload()
}
