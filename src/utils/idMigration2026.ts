import localForage from 'localforage'

// One-shot local data wipe for the 2026 uuidv7 id migration
// (sql/one-offs/2026-10-28_uuidv7_migration.sql rewrote every row id on
// the server). Local rows still carry the old ids - keeping them would
// ghost-duplicate every dataset on the next sync. So once, on the first
// boot of the new version, all local data and cursors are discarded and
// the app reloads into a full resync.
//
// Offline changes not yet synced at that moment are lost. Accepted risk:
// effectively one active user, desktop, always online.
const WIPE_FLAG = 'vermehrung:id-migration-2026-10-28'

export const maybeWipeForIdMigration = async () => {
  if (window.localStorage.getItem(WIPE_FLAG)) return
  // remove the flag first: if anything below throws, the next boot retries
  window.localStorage.setItem(WIPE_FLAG, '1')
  try {
    // persisted atoms: cursors (lastUpdated), the unflushed revs registry
    // and the api token must all go
    for (const key of Object.keys(window.localStorage)) {
      if (key.startsWith('vermehrung:')) window.localStorage.removeItem(key)
    }
    // set the flag again - the loop above removed it
    window.localStorage.setItem(WIPE_FLAG, '1')
    await localForage.clear()
    // the watermelondb loki adapter persists to this IndexedDB database
    window.indexedDB.deleteDatabase('loki.db')
  } catch (error) {
    console.log('id migration wipe failed, will retry on next boot:', error)
    window.localStorage.removeItem(WIPE_FLAG)
    return
  }
  window.location.reload()
}
