import { Database, type Model } from 'nitromelondb'
import LokiJSAdapter from 'nitromelondb/adapters/lokijs'

import {
  addNotification,
  removeNotificationById,
} from '../store/index.ts'
import type { TableName } from '../store/index.ts'

// One-time migration from the LokiJS IndexedDB store (the adapter used
// until the wa-sqlite switch) into the SQLite database. nitromelondb does
// not carry LokiJS browser data over, so without this the app would come
// up empty and re-sync everything from the server - unavailable to field
// users while offline after updating.
//
// Runs while the app holds no Database yet (initiateDb awaits it before the
// db is set into the store), so no query can race the inserts. The legacy
// LokiJS database is deliberately KEPT as a local backup; only the flag
// below prevents re-processing.

const MIGRATION_FLAG_KEY = 'vermehrung:sqlite-migrated-v1'
const MIGRATION_LOCK_KEY = 'vermehrung:sqlite-migrating'
const MIGRATION_LOCK_STALE_MS = 10 * 60_000
const CHUNK_SIZE = 1000

const markMigrated = () => {
  window.localStorage.setItem(MIGRATION_FLAG_KEY, String(Date.now()))
}

export const migrateLokiToSqliteIfNeeded = async (target: Database) => {
  if (window.localStorage.getItem(MIGRATION_FLAG_KEY) !== null) return

  // no api token: logged out. Logging in resets the database anyway, so
  // there is nothing of the previous session worth copying
  if (!window.localStorage.getItem('token')) {
    markMigrated()
    return
  }

  const databases = await indexedDB.databases()
  const hasLokiData = databases.some(({ name }) => /loki/i.test(name ?? ''))
  if (!hasLokiData) {
    markMigrated()
    return
  }

  // another tab might be migrating right now - let it finish and boot
  // empty here (the regular sync fills this tab once it is online)
  const lockAge = Date.now() - Number(window.localStorage.getItem(MIGRATION_LOCK_KEY))
  if (lockAge < MIGRATION_LOCK_STALE_MS) return
  window.localStorage.setItem(MIGRATION_LOCK_KEY, String(Date.now()))

  const notificationId = addNotification({
    message:
      'Die lokalen Daten werden auf die neue Datenbank migriert. Das dauert kurz - bitte nicht schliessen.',
    type: 'info',
    duration: 1000000,
  })

  try {
    const [{ schema }, { modelClasses }] = await Promise.all([
      import('../dbSchema/schema.ts'),
      // dynamic: initiateDb imports this module, a static import would be
      // circular
      import('./initiateDb.ts'),
    ])
    const { migrations } = await import('./migrations.ts')
    // same options the app used before the wa-sqlite switch: the defaults
    // (no dbName, synchronous worker) address the very IndexedDB store we
    // are migrating from
    const source = new Database({
      adapter: new LokiJSAdapter({
        schema,
        migrations,
        useWebWorker: false,
        useIncrementalIndexedDB: true,
      }),
      modelClasses,
    })

    let migratedRecords = 0
    for (const table of Object.values(schema.tables)) {
      const tableName = table.name as TableName
      const records = (await source
        .get(tableName)
        .query()
        .fetch()) as Model[]
      if (!records.length) continue
      for (let i = 0; i < records.length; i += CHUNK_SIZE) {
        const operations = records
          .slice(i, i + CHUNK_SIZE)
          .map(
            (record) =>
              ['create', tableName, record._raw] as const,
          )
        await target.adapter.batch(operations as never[])
      }
      migratedRecords += records.length
    }
    console.log(
      `loki -> sqlite migration complete: ${migratedRecords} records`,
    )
    markMigrated()
  } catch (error) {
    console.error('loki -> sqlite migration failed:', error)
    // wipe the partial copy so the next boot can retry from the intact
    // loki data; this is safe - the app does not use the database yet
    await target.write(async () => target.unsafeResetDatabase())
  } finally {
    window.localStorage.removeItem(MIGRATION_LOCK_KEY)
    if (notificationId) removeNotificationById(notificationId)
  }
}
