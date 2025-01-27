import localForage from 'localforage'

export const reloadData = async ({ store }) => {
  const { db } = store

  await localForage.clear()
  await db.write(async () => db.unsafeResetDatabase())
  window.localStorage.removeItem('token')
  window.location.reload(true)
}
