import { types } from 'mobx-state-tree'

export default types.model('QueuedQuery', {
  id: types.identifier,
  time: types.union(types.number, types.undefined),
  name: types.string,
  variables: types.maybeNull(types.string, null),
  // a query to run after the first
  // to refresh the data from the server
  callbackQuery: types.maybeNull(types.string, null),
  callbackQueryVariables: types.maybeNull(types.string, null),
  refetchTree: types.optional(types.boolean, false),
  revertTable: types.union(types.string, types.null, types.undefined),
  revertId: types.union(
    types.string,
    types.number,
    types.null,
    types.undefined,
  ),
  revertField: types.union(
    types.string,
    types.number,
    types.null,
    types.undefined,
  ),
  revertValue: types.union(
    types.string,
    types.number,
    types.boolean,
    types.null,
    types.undefined,
  ),
  revertValues: types.union(types.string, types.null, types.undefined),
})
