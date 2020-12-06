import { types } from 'mobx-state-tree'

export default types.model('Node', {
  nodeType: types.optional(types.string, ''),
  menuTitle: types.optional(types.string, ''),
  table: types.optional(types.string, ''),
  id: types.optional(types.union(types.string, types.number), ''),
  label: types.optional(types.union(types.string, types.number), ''),
  url: types.array(types.union(types.string, types.number)),
  sort: types.array(types.number),
  hasChildren: types.optional(types.boolean, false),
  childrenCount: types.optional(types.number, 0),
})

export const defaultValue = {
  nodeType: '',
  menuTitle: '',
  table: '',
  id: '',
  label: '',
  url: [],
  sort: [],
  hasChildren: false,
  childrenCount: 0,
}
