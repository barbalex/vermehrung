import { tableSchema } from '@nozbe/watermelondb'

const lieferung_file = {
  name: 'lieferung_file',
  columns: [
    { name: 'lieferung_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'file_id', type: 'string', isOptional: true },
    { name: 'file_mime_type', type: 'string', isOptional: true },
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'beschreibung', type: 'string', isOptional: true },
    { name: 'changed', type: 'string', isOptional: true },
    { name: '_rev_at', type: 'number', isOptional: true },
  ],
}

export default tableSchema(lieferung_file)
