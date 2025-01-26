import { tableSchema } from '@nozbe/watermelondb'

export const apflora_av = tableSchema({
  name: 'apflora_av',
  columns: [
    { name: 'ae_id', type: 'string', isIndexed: true },
    { name: 'av', type: 'string' },
  ],
})
