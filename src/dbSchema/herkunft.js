import { tableSchema } from '@nozbe/watermelondb'

const herkunft = {
  name: 'herkunft',
  columns: [
    // can not add id here
    // see: https://github.com/Nozbe/WatermelonDB/issues/7#issuecomment-419248401
    { name: 'nr', type: 'string', isOptional: true },
    { name: 'lokalname', type: 'string', isOptional: true },
    { name: 'gemeinde', type: 'string', isOptional: true },
    { name: 'kanton', type: 'string', isOptional: true },
    { name: 'land', type: 'string', isOptional: true },
    { name: 'geom_point', type: 'string', isOptional: true },
    { name: 'wgs84_lat', type: 'string', isOptional: true },
    { name: 'wgs84_long', type: 'string', isOptional: true },
    { name: 'lv95_x', type: 'string', isOptional: true },
    { name: 'lv95_y', type: 'string', isOptional: true },
    { name: 'bemerkungen', type: 'string', isOptional: true },
    { name: 'changed', type: 'string', isOptional: true },
    { name: 'changed_by', type: 'string', isOptional: true },
    { name: '_rev', type: 'string', isOptional: true },
    { name: '_parent_rev', type: 'string', isOptional: true },
    { name: '_revisions', type: 'string', isOptional: true },
    { name: '_depth', type: 'string', isOptional: true },
    { name: '_deleted', type: 'boolean', isOptional: true },
    { name: '_conflicts', type: 'string', isOptional: true },
  ],
}

export default tableSchema(herkunft)
