import { tableSchema } from '@nozbe/watermelondb'

export const kultur_option = tableSchema({
  name: 'kultur_option',
  columns: [
    { name: 'z_bemerkungen', type: 'boolean', isOptional: true },
    { name: 'tz_teilkultur_id', type: 'boolean', isOptional: true },
    // tz_anzahl_mutterpflanzen is not used any more
    { name: 'tz_anzahl_mutterpflanzen', type: 'boolean', isOptional: true },
    { name: 'tz_andere_menge', type: 'boolean', isOptional: true },
    {
      name: 'tz_auspflanzbereit_beschreibung',
      type: 'boolean',
      isOptional: true,
    },
    { name: 'tz_bemerkungen', type: 'boolean', isOptional: true },
    { name: 'tk', type: 'boolean', isOptional: true },
    { name: 'tk_bemerkungen', type: 'boolean', isOptional: true },
    { name: 'ev_teilkultur_id', type: 'boolean', isOptional: true },
    { name: 'ev_geplant', type: 'boolean', isOptional: true },
    { name: 'ev_person_id', type: 'boolean', isOptional: true },
    { name: 'ev_datum', type: 'boolean', isOptional: true },
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
