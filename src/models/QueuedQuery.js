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
})
