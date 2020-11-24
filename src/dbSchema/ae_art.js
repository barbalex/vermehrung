import { tableSchema } from '@nozbe/watermelondb'

const ae_art = {
  name: 'ae_art',
  columns: [
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'changed', type: 'string', isOptional: true },
    { name: '_rev_at', type: 'number', isOptional: true, isIndexed: true },
  ],
}

export default tableSchema(ae_art)
