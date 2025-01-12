import { tableSchema } from '@nozbe/watermelondb'

export const sammlung = tableSchema({
  name: 'sammlung',
  columns: [
    // can not add id here
    // see: https://github.com/Nozbe/WatermelonDB/issues/7#issuecomment-419248401
    { name: 'art_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'person_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'herkunft_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'nr', type: 'string', isOptional: true },
    { name: 'datum', type: 'string', isOptional: true, isIndexed: true },
    { name: 'von_anzahl_individuen', type: 'number', isOptional: true },
    { name: 'anzahl_pflanzen', type: 'number', isOptional: true },
    { name: 'gramm_samen', type: 'number', isOptional: true },
    { name: 'andere_menge', type: 'string', isOptional: true },
    { name: 'geom_point', type: 'string', isOptional: true },
    { name: 'wgs84_lat', type: 'number', isOptional: true },
    { name: 'wgs84_long', type: 'number', isOptional: true },
    { name: 'lv95_x', type: 'number', isOptional: true },
    { name: 'lv95_y', type: 'number', isOptional: true },
    { name: 'geplant', type: 'boolean', isOptional: true },
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
