import { tableSchema } from '@nozbe/watermelondb'

const person_option = {
  name: 'person_option',
  columns: [
    { name: 'ar_name_deutsch', type: 'boolean', isOptional: true },
    { name: 'ga_strasse', type: 'boolean', isOptional: true },
    { name: 'ga_plz', type: 'boolean', isOptional: true },
    { name: 'ga_ort', type: 'boolean', isOptional: true },
    { name: 'ga_geom_point', type: 'boolean', isOptional: true },
    { name: 'ga_lat_lng', type: 'boolean', isOptional: true },
    { name: 'ga_aktiv', type: 'boolean', isOptional: true },
    { name: 'ga_bemerkungen', type: 'boolean', isOptional: true },
    { name: 'hk_kanton', type: 'boolean', isOptional: true },
    { name: 'hk_land', type: 'boolean', isOptional: true },
    { name: 'hk_bemerkungen', type: 'boolean', isOptional: true },
    { name: 'hk_geom_point', type: 'boolean', isOptional: true },
    { name: 'ku_zwischenlager', type: 'boolean', isOptional: true },
    { name: 'ku_erhaltungskultur', type: 'boolean', isOptional: true },
    { name: 'li_show_sl_felder', type: 'boolean', isOptional: true },
    { name: 'li_show_sl', type: 'boolean', isOptional: true },
    {
      name: 'sl_show_empty_when_next_to_li',
      type: 'boolean',
      isOptional: true,
    },
    { name: 'sl_auto_copy_edits', type: 'boolean', isOptional: true },
    { name: 'tree_kultur', type: 'boolean', isOptional: true },
    { name: 'tree_teilkultur', type: 'boolean', isOptional: true },
    { name: 'tree_zaehlung', type: 'boolean', isOptional: true },
    { name: 'tree_lieferung', type: 'boolean', isOptional: true },
    { name: 'tree_event', type: 'boolean', isOptional: true },

    { name: 'changed', type: 'string', isOptional: true },
    { name: 'changed_by', type: 'string', isOptional: true },
    { name: '_rev', type: 'string', isOptional: true },
    { name: '_parent_rev', type: 'string', isOptional: true },
    { name: '_revisions', type: 'string', isOptional: true },
    { name: '_depth', type: 'number', isOptional: true },
    { name: '_deleted', type: 'boolean', isOptional: true, isIndexed: true },
    { name: '_conflicts', type: 'string', isOptional: true },
  ],
}

export default tableSchema(person_option)
