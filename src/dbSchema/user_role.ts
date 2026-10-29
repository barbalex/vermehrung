import { tableSchema } from 'nitromelondb'

export const user_role = tableSchema({
  name: 'user_role',
  columns: [
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'label', type: 'string', isOptional: true },
    { name: 'sort', type: 'number', isOptional: true, isIndexed: true },
    { name: 'comment', type: 'string', isOptional: true },
    { name: 'changed', type: 'string', isOptional: true },
  ],
})
