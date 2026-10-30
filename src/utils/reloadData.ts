import localForage from 'localforage'

import { store, dbAtom, resetSyncState } from '../store/index.ts'

export const reloadData = async () => {
  const db = store.get(dbAtom)

  // reset the database FIRST, on an idle app - see the comment in Login.tsx
  // fetchLogin for why the reset must not overlap state churn
  if (db) await db.write(async () => db.unsafeResetDatabase())
  await localForage.clear()
  resetSyncState()
  window.localStorage.removeItem('token')
  window.location.reload()
}
