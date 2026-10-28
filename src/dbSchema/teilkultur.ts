import { tableSchema } from '@nozbe/watermelondb'

export const teilkultur = tableSchema({
  name: 'teilkultur',
  columns: [
    // can not add id here
    // see: https://github.com/Nozbe/WatermelonDB/issues/7#issuecomment-419248401
    { name: 'kultur_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'ort1', type: 'string', isOptional: true },
    { name: 'ort2', type: 'string', isOptional: true },
    { name: 'ort3', type: 'string', isOptional: true },
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
