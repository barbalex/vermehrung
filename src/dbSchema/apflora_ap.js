import { tableSchema } from '@nozbe/watermelondb'

export const apflora_ap = tableSchema({
  name: 'apflora_ap',
  columns: [
    { name: 'ae_id', type: 'string', isIndexed: true },
    { name: 'ap', type: 'boolean', isOptional: true },
    { name: 'av', type: 'string', isOptional: true },
  ],
})
