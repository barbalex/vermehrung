import { tableSchema } from '@nozbe/watermelondb'

const ae_art = {
  name: 'ae_art',
  columns: [
    { name: 'name', type: 'string', isOptional: true },
    { name: 'name_deutsch', type: 'string', isOptional: true },
    { name: 'name_latein', type: 'string', isOptional: true },
    //{ name: 'changed', type: 'string', isOptional: true },
  ],
}

export default tableSchema(ae_art)
