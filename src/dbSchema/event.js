import { tableSchema } from '@nozbe/watermelondb'

const event = {
  name: 'event',
  columns: [
    // can not add id here
    { name: 'kultur_id', type: 'string', isOptional: true },
    { name: 'teilkultur_id', type: 'string', isOptional: true },
    { name: 'person_id', type: 'string', isOptional: true },
    { name: 'beschreibung', type: 'string', isOptional: true },
    { name: 'geplant', type: 'boolean', isOptional: true },
    { name: 'datum', type: 'string', isOptional: true, isIndexed: true },
    { name: 'changed', type: 'string', isOptional: true },
    { name: 'changed_by', type: 'string', isOptional: true },
    { name: '_rev', type: 'string', isOptional: true },
    { name: '_rev_at', type: 'number', isOptional: true, isIndexed: true },
    { name: '_parent_rev', type: 'string', isOptional: true },
    { name: '_revisions', type: 'string', isOptional: true },
    { name: '_depth', type: 'number', isOptional: true },
    { name: '_deleted', type: 'boolean', isOptional: true, isIndexed: true },
    { name: '_conflicts', type: 'string', isOptional: true },
  ],
}

export default tableSchema(event)
