import { types } from 'mobx-state-tree'

export default types.model('QueuedQuery', {
  name: types.string,
  variables: types.maybeNull(types.string, null),
  // a query to run after the first
  // to refresh the data from the server
  callbackQuery: types.maybeNull(types.string, null),
  callbackQueryVariables: types.maybeNull(types.string, null),
})
