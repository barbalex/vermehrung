import { types } from 'mobx-state-tree'

export default types.model('Node', {
  nodeType: types.union(
    types.string,
    types.number,
    types.null,
    types.undefined,
  ),
  menuTitle: types.union(
    types.string,
    types.number,
    types.null,
    types.undefined,
  ),
  table: types.union(types.string, types.number, types.null, types.undefined),
  id: types.union(types.string, types.number, types.null, types.undefined),
  // TODO: remove when all nodes converted to mst
  parentId: types.union(
    types.string,
    types.number,
    types.null,
    types.undefined,
  ),
  label: types.union(types.string, types.number, types.null, types.undefined),
  url: types.array(types.union(types.string, types.number)),
  sort: types.array(types.union(types.string, types.number)),
  hasChildren: types.optional(types.boolean, false),
  mono: types.optional(types.boolean, false),
})

export const defaultValue = {
  nodeType: '',
  menuTitle: '',
  table: '',
  id: '',
  parentId: '',
  label: '',
  url: [],
  sort: [],
  hasChildren: false,
  mono: false,
}
