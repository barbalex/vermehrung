import { Database } from 'nitromelondb'
import SQLiteAdapter from 'nitromelondb/adapters/sqlite'

import wasmUrl from '../../node_modules/nitromelondb/adapters/sqlite/sqlite-wasm/wa-sqlite-async.wasm?url'
import { addNotification } from '../store/index.ts'
import { schema } from '../dbSchema/schema.ts'
import {
  AeArt,
  ApfloraAp,
  Art,
  ArtFile,
  ArtQk,
  Av,
  Bedarf,
  Event,
  Garten,
  GartenFile,
  Gv,
  Herkunft,
  HerkunftFile,
  Kultur,
  KulturFile,
  KulturOption,
  KulturQk,
  Lieferung,
  LieferungFile,
  Person,
  PersonFile,
  PersonOption,
  SammelLieferung,
  Sammlung,
  SammlungFile,
  Teilkultur,
  Teilzaehlung,
  UserRole,
  Zaehlung,
} from '../dbModel.ts'
import { migrations } from './migrations.ts'
import { migrateLokiToSqliteIfNeeded } from './migrateLokiToSqlite.ts'

export const modelClasses = [
  AeArt,
  ApfloraAp,
  Art,
  ArtFile,
  ArtQk,
  Av,
  Bedarf,
  Event,
  Garten,
  GartenFile,
  Gv,
  Herkunft,
  HerkunftFile,
  Kultur,
  KulturFile,
  KulturOption,
  KulturQk,
  Lieferung,
  LieferungFile,
  Person,
  PersonFile,
  PersonOption,
  SammelLieferung,
  Sammlung,
  SammlungFile,
  Teilkultur,
  Teilzaehlung,
  UserRole,
  Zaehlung,
]

export const initiateDb = async () => {
  // wa-sqlite runs in a dedicated worker (Asyncify build) and persists to
  // IndexedDB via IDBBatchAtomicVFS - the database work never touches the
  // main thread. workerFactory + wasmUrl are the adapter's supported
  // bundler overrides (see its README): the defaults assume an unbundled
  // setup that does not work under Vite.
  const adapter = new SQLiteAdapter({
    schema,
    migrations, // optional migrations
    dbName: 'vermehrung',
    onSetUpError: () => {
      // Database failed to load -- offer the user to reload the app or log out
      addNotification({
        message:
          'Die lokale Datenbank wurde nicht richtig initialisiert. Bitte laden Sie die App neu.',
      })
    },
    web: {
      wasmUrl,
      workerFactory: () =>
        new Worker(new URL('./sqliteWorkerEntry.ts', import.meta.url), {
          type: 'module',
        }),
    },
  })

  const database = new Database({
    adapter,
    modelClasses,
  })

  // migrate legacy LokiJS data into the empty SQLite store before the
  // database reaches the app, so no query can race the inserts
  await migrateLokiToSqliteIfNeeded(database)

  return database
}
