import { types } from 'mobx-state-tree'

export default types.model('Notification', {
  id: types.identifier,
  time: types.optional(types.number, Date.now()),
  text: types.union(types.string, types.number, types.null),
  duration: types.optional(types.number, 10000),
  dismissable: types.optional(types.boolean, true),
  allDismissable: types.optional(types.boolean, true),
  action1Name: types.union(types.string, types.null),
  action1Argument: types.union(types.string, types.number, types.null),
  action2Name: types.union(types.string, types.null),
  action2Argument: types.union(types.string, types.number, types.null),
  type: types.optional(types.string, 'error'), // also: 'success', 'warning', 'info'
})
