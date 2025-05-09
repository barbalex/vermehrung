import { tableSchema } from '@nozbe/watermelondb'

export const art = tableSchema({
  name: 'art',
  columns: [
    { name: 'ae_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'set', type: 'string', isOptional: true, isIndexed: true },
    { name: 'apflora_av', type: 'string', isOptional: true },
    { name: 'apflora_ap', type: 'boolean', isOptional: true },
    { name: 'changed', type: 'string', isOptional: true },
    { name: 'changed_by', type: 'string', isOptional: true },
    { name: '_rev', type: 'string', isOptional: true },
    { name: '_parent_rev', type: 'string', isOptional: true },
    { name: '_revisions', type: 'string', isOptional: true },
    { name: '_depth', type: 'number', isOptional: true },
    { name: '_deleted', type: 'boolean', isOptional: true, isIndexed: true },
    { name: '_conflicts', type: 'string', isOptional: true },
  ],
})
