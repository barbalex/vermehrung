import { tableSchema } from '@nozbe/watermelondb'

export const art_qk = tableSchema({
  name: 'art_qk',
  columns: [
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'titel', type: 'string', isOptional: true },
    { name: 'beschreibung', type: 'string', isOptional: true },
    { name: 'sort', type: 'number', isOptional: true, isIndexed: true },
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
