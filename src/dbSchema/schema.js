import { appSchema } from '@nozbe/watermelondb'

import herkunft from './herkunft'
import sammlung from './sammlung'

export default appSchema({
  version: 1,
  tables: [herkunft, sammlung],
})
