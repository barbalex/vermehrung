import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'

import schema from '../dbSchema/schema'
import {
  AeArt,
  Art,
  ArtFile,
  ArtQk,
  ArtQkChoosen,
  Av,
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
  KulturQkChoosen,
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
} from '../dbModel'

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
    modelClasses: [
      AeArt,
      Art,
      ArtFile,
      ArtQk,
      ArtQkChoosen,
      Av,
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
      KulturQkChoosen,
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
    actionsEnabled: true,
  })

  return database
}

export default initiateDb
