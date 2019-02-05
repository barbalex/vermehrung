import { types } from 'mobx-state-tree'

export default types.model('Node', {
  idsFiltered: types.array(types.union(types.string, types.number)),
  nodeType: types.optional(types.string, ''),
  menuTitle: types.optional(types.string, ''),
  table: types.optional(types.string, ''),
  id: types.optional(types.union(types.string, types.number), ''),
  parentId: types.optional(types.union(types.string, types.number), ''),
  label: types.optional(types.union(types.string, types.number), ''),
  url: types.array(types.union(types.string, types.number)),
  sort: types.array(types.union(types.string, types.number)),
  hasChildren: types.optional(types.boolean, false),
})

export const defaultValue = {
  idsFiltered: [],
  nodeType: '',
  menuTitle: '',
  table: '',
  id: '',
  parentId: '',
  label: '',
  url: [],
  sort: [],
  hasChildren: false,
}
