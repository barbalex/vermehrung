import { Database } from 'nitromelondb'
import LokiJSAdapter from 'nitromelondb/adapters/lokijs'

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

export const initiateDb = () => {
  const adapter = new LokiJSAdapter({
    schema,
    migrations, // optional migrations
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
    onQuotaExceededError: () => {
      console.log('the browser ran out of disk space')
      addNotification({
        message:
          'Es gibt nicht genug Speicherplatz auf der Festplatte bzw. dem Browser steht nicht genug zur Verfügung.',
      })
    },
    onSetUpError: () => {
      // Database failed to load -- offer the user to reload the app or log out
      addNotification({
        message:
          'Die lokale Datenbank wurde nicht richtig initialisiert. Bitte laden Sie die App neu.',
      })
    },
  })

  const database = new Database({
    adapter,
    modelClasses: [
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
    ],
  })

  return database
}
