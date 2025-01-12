import { tableSchema } from '@nozbe/watermelondb'

export const herkunft = tableSchema({
  name: 'herkunft',
  columns: [
    // can not add id here
    // see: https://github.com/Nozbe/WatermelonDB/issues/7#issuecomment-419248401
    { name: 'nr', type: 'string', isOptional: true, isIndexed: true },
    { name: 'lokalname', type: 'string', isOptional: true, isIndexed: true },
    { name: 'gemeinde', type: 'string', isOptional: true, isIndexed: true },
    { name: 'kanton', type: 'string', isOptional: true },
    { name: 'land', type: 'string', isOptional: true },
    { name: 'geom_point', type: 'string', isOptional: true },
    { name: 'wgs84_lat', type: 'number', isOptional: true },
    { name: 'wgs84_long', type: 'number', isOptional: true },
    { name: 'lv95_x', type: 'number', isOptional: true },
    { name: 'lv95_y', type: 'number', isOptional: true },
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
