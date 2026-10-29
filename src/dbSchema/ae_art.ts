import { tableSchema } from 'nitromelondb'

export const ae_art = tableSchema({
  name: 'ae_art',
  columns: [
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'taxonomy', type: 'string', isOptional: true, isIndexed: true },
    { name: 'changed', type: 'string', isOptional: true },
  ],
})
