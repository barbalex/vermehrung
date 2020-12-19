import { tableSchema } from '@nozbe/watermelondb'

const kultur_qk_choosen = {
  name: 'kultur_qk_choosen',
  columns: [
    { name: 'kultur_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'qk_id', type: 'string', isOptional: true, isIndexed: true },
    { name: 'choosen', type: 'boolean', isOptional: true, isIndexed: true },
    { name: 'changed', type: 'string', isOptional: true },
    { name: 'changed_by', type: 'string', isOptional: true },
    { name: '_rev', type: 'string', isOptional: true },
    { name: '_parent_rev', type: 'string', isOptional: true },
    { name: '_revisions', type: 'string', isOptional: true },
    { name: '_depth', type: 'number', isOptional: true },
    { name: '_deleted', type: 'boolean', isOptional: true, isIndexed: true },
    { name: '_conflicts', type: 'string', isOptional: true },
  ],
}

export default tableSchema(kultur_qk_choosen)
