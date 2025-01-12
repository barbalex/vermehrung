import { tableSchema } from '@nozbe/watermelondb'

export const sammel_lieferung = tableSchema({
  name: 'sammel_lieferung',
  columns: [
    // can not add id here
    { name: 'art_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'person_id', type: 'string', isOptional: true, isIndexed: true },
    {
      name: 'von_sammlung_id',
      type: 'string',
      isOptional: true,
      isIndexed: true,
    },
    {
      name: 'von_kultur_id',
      type: 'string',
      isOptional: true,
      isIndexed: true,
    },
    { name: 'datum', type: 'string', isOptional: true, isIndexed: true },
    {
      name: 'nach_kultur_id',
      type: 'string',
      isOptional: true,
      isIndexed: true,
    },
    { name: 'nach_ausgepflanzt', type: 'boolean', isOptional: true },
    { name: 'von_anzahl_individuen', type: 'number', isOptional: true },
    {
      name: 'anzahl_pflanzen',
      type: 'number',
      isOptional: true,
      isIndexed: true,
    },
    { name: 'anzahl_auspflanzbereit', type: 'number', isOptional: true },
    { name: 'gramm_samen', type: 'number', isOptional: true },
    { name: 'andere_menge', type: 'string', isOptional: true },
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
