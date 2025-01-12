import { tableSchema } from '@nozbe/watermelondb'

export const garten = tableSchema({
  name: 'garten',
  columns: [
    // can not add id here
    // see: https://github.com/Nozbe/WatermelonDB/issues/7#issuecomment-419248401
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'person_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'strasse', type: 'string', isOptional: true },
    { name: 'plz', type: 'number', isOptional: true },
    { name: 'ort', type: 'string', isOptional: true },
    { name: 'geom_point', type: 'string', isOptional: true },
    { name: 'wgs84_lat', type: 'number', isOptional: true },
    { name: 'wgs84_long', type: 'number', isOptional: true },
    { name: 'lv95_x', type: 'number', isOptional: true },
    { name: 'lv95_y', type: 'number', isOptional: true },
    { name: 'aktiv', type: 'boolean', isOptional: true, isIndexed: true },
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
