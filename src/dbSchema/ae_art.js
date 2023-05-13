import { tableSchema } from '@nozbe/watermelondb'

const ae_art = {
  name: 'ae_art',
  columns: [
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'taxonomy', type: 'string', isOptional: true, isIndexed: true },
    { name: 'changed', type: 'string', isOptional: true },
  ],
}

export default tableSchema(ae_art)
