import { tableSchema } from '@nozbe/watermelondb'

const garten_file = {
  name: 'garten_file',
  columns: [
    { name: 'garten_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'file_id', type: 'string', isOptional: true },
    { name: 'file_mime_type', type: 'string', isOptional: true },
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'beschreibung', type: 'string', isOptional: true },
    { name: 'changed', type: 'string', isOptional: true },
  ],
}

export default tableSchema(garten_file)
