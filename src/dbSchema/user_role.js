import { tableSchema } from '@nozbe/watermelondb'

const user_role = {
  name: 'user_role',
  columns: [
    { name: 'name', type: 'string', isOptional: true, isIndexed: true },
    { name: 'label', type: 'string', isOptional: true },
    { name: 'sort', type: 'number', isOptional: true, isIndexed: true },
    { name: 'comment', type: 'string', isOptional: true },
    { name: 'changed', type: 'string', isOptional: true },
    { name: '_rev_at', type: 'number', isOptional: true },
  ],
}

export default tableSchema(user_role)
