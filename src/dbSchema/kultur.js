import { tableSchema } from '@nozbe/watermelondb'

export const kultur = tableSchema({
  name: 'kultur',
  columns: [
    // can not add id here
    // see: https://github.com/Nozbe/WatermelonDB/issues/7#issuecomment-419248401
    { name: 'art_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'herkunft_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'garten_id', type: 'string', isOptional: true, isIndexed: true },
    {
      name: 'zwischenlager',
      type: 'boolean',
      isOptional: true,
      isIndexed: true,
    },
    {
      name: 'erhaltungskultur',
      type: 'boolean',
      isOptional: true,
    },
    { name: 'von_anzahl_individuen', type: 'number', isOptional: true },
    { name: 'bemerkungen', type: 'string', isOptional: true },
    { name: 'aktiv', type: 'boolean', isOptional: true, isIndexed: true },
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
