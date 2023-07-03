import { types } from 'mobx-state-tree'

export default types.model('Notification', {
  id: types.identifier,
  time: types.union(types.number, types.undefined),
  title: types.union(types.string, types.number, types.null, types.undefined),
  message: types.union(types.string, types.number, types.null, types.undefined),
  info: types.union(types.string, types.number, types.null, types.undefined),
  duration: types.union(types.number, types.undefined),
  dismissable: types.union(types.boolean, types.undefined),
  allDismissable: types.optional(types.boolean, true),
  actionLabel: types.union(types.string, types.null, types.undefined),
  actionName: types.union(types.string, types.null, types.undefined),
  actionArgument: types.union(
    types.string,
    types.number,
    types.null,
    types.undefined,
  ),
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
  type: types.union(types.string, types.undefined), // 'success', 'warning', 'info', 'error'
})
