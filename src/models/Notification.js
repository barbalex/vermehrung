import { types } from 'mobx-state-tree'

export default types.model('Notification', {
  id: types.identifier,
  time: types.union(types.number, types.undefined),
  message: types.union(types.string, types.number, types.null, types.undefined),
  duration: types.union(types.number, types.undefined),
  dismissable: types.union(types.boolean, types.undefined),
  allDismissable: types.optional(types.boolean, true),
  action1Label: types.union(types.string, types.null, types.undefined),
  action1Name: types.union(types.string, types.null, types.undefined),
  action1Argument: types.union(
    types.string,
    types.number,
    types.null,
    types.undefined,
  ),
  action2Name: types.union(types.string, types.null, types.undefined),
  action2Argument: types.union(
    types.string,
    types.number,
    types.null,
    types.undefined,
  ),
  type: types.union(types.string, types.undefined), // 'success', 'warning', 'info', 'error'
})
