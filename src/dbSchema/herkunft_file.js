import { tableSchema } from '@nozbe/watermelondb'

export const herkunft_file = tableSchema({
  name: 'herkunft_file',
  columns: [
    { name: 'herkunft_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'file_id', type: 'string', isOptional: true },
    { name: 'file_mime_type', type: 'string', isOptional: true },
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'beschreibung', type: 'string', isOptional: true },
    { name: 'changed', type: 'string', isOptional: true },
    { name: '_rev_at', type: 'string', isOptional: true },
  ],
})
