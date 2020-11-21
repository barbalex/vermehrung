import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'

import schema from '../dbSchema/schema'
import { AeArt, Art, Garten, Herkunft, Lieferung, Sammlung } from '../dbModel'

const initiateDb = () => {
  const adapter = new LokiJSAdapter({
    schema,
    // migrations, // optional migrations
    useWebWorker: false,
    useIncrementalIndexedDB: true,
    // dbName: 'myapp', // optional db name
    // It's recommended you implement this method:
    // onIndexedDBVersionChange: () => {
    //   // database was deleted in another browser tab (user logged out), so we must make sure we delete
    //   // it in this tab as well
    //   if (checkIfUserIsLoggedIn()) {
    //     window.location.reload()
    //   }
    // },
    // Optional:
    // onQuotaExceededError: (error) => { /* do something when user runs out of disk space */ },
  })

  const database = new Database({
    adapter,
    modelClasses: [AeArt, Art, Garten, Herkunft, Lieferung, Sammlung],
    actionsEnabled: true,
  })

  return database
}

export default initiateDb
