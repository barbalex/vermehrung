import { appSchema } from '@nozbe/watermelondb'

import herkunft from './herkunft'

export default appSchema({
  version: 1,
  tables: [herkunft],
})
