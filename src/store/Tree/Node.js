import { types } from 'mobx-state-tree'

export default types.model('Node', {
  childrenCount: types.optional(types.number, 0),
  hasChildren: types.optional(types.boolean, false),
  id: types.optional(types.union(types.string, types.number), ''),
  label: types.optional(types.union(types.string, types.number), ''),
  menuTitle: types.optional(types.union(types.string, types.number), ''),
  nodeType: types.optional(types.string, ''),
  sort: types.optional(types.array(types.number), []),
  table: types.optional(types.string, ''),
  url: types.optional(types.array(types.union(types.string, types.number)), []),
})

export const defaultValue = {
  childrenCount: 0,
  hasChildren: false,
  id: '',
  label: '',
  menuTitle: '',
  nodeType: '',
  sort: [],
  table: '',
  url: [],
}
