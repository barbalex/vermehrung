import { appSchema } from '@nozbe/watermelondb'

import ae_art from './ae_art'
import art from './art'
import herkunft from './herkunft'
import lieferung from './lieferung'
import sammlung from './sammlung'

export default appSchema({
  version: 1,
  tables: [ae_art, art, herkunft, lieferung, sammlung],
})
