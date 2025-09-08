import { tableSchema } from '@nozbe/watermelondb'

export const zaehlung = tableSchema({
  name: 'zaehlung',
  columns: [
    // can not add id here
    { name: 'kultur_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'datum', type: 'string', isOptional: true, isIndexed: true },
    { name: 'bedarf', type: 'boolean', isOptional: true },
    { name: 'bemerkungen', type: 'string', isOptional: true },
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
