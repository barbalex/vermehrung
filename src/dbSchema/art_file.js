import { tableSchema } from '@nozbe/watermelondb'

const art_file = {
  name: 'art_file',
  columns: [
    { name: 'art_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'file_id', type: 'string', isOptional: true },
    { name: 'file_mime_type', type: 'string', isOptional: true },
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'beschreibung', type: 'string', isOptional: true },
    { name: 'changed', type: 'string', isOptional: true },
    { name: '_rev_at', type: 'string', isOptional: true },
  ],
}

export default tableSchema(art_file)
