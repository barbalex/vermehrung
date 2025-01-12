import { tableSchema } from '@nozbe/watermelondb'

export const teilzaehlung = tableSchema({
  name: 'teilzaehlung',
  columns: [
    // can not add id here
    { name: 'zaehlung_id', type: 'string', isOptional: true, isIndexed: true },
    {
      name: 'teilkultur_id',
      type: 'string',
      isOptional: true,
      isIndexed: true,
    },
    {
      name: 'anzahl_pflanzen',
      type: 'number',
      isOptional: true,
      isIndexed: true,
    },
    { name: 'anzahl_auspflanzbereit', type: 'number', isOptional: true },
    { name: 'anzahl_mutterpflanzen', type: 'number', isOptional: true },
    { name: 'andere_menge', type: 'string', isOptional: true },
    { name: 'auspflanzbereit_beschreibung', type: 'string', isOptional: true },
    { name: 'bemerkungen', type: 'string', isOptional: true },
    { name: 'prognose_von_tz', type: 'string', isOptional: true },
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
