import { types } from 'mobx-state-tree'

export const QueuedQuery = types.model('QueuedQuery', {
  id: types.identifier,
  time: types.union(types.number, types.undefined),
  name: types.string,
  variables: types.maybeNull(types.string, null),
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
  newValue: types.union(
    types.string,
    types.number,
    types.boolean,
    types.null,
    types.undefined,
    // needed for geom_point
    types.frozen(),
  ),
  revertValue: types.union(
    types.string,
    types.number,
    types.boolean,
    types.null,
    types.undefined,
    // needed for geom_point
    types.frozen(),
  ),
  revertValues: types.union(types.string, types.null, types.undefined),
  isInsert: types.optional(types.maybeNull(types.boolean), false),
})
