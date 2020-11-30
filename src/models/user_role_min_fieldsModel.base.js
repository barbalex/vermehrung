/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * user_role_min_fieldsBase
 * auto generated base class for the model user_role_min_fieldsModel.
 */
export const user_role_min_fieldsModelBase = ModelBase
  .named('user_role_min_fields')
  .props({
    __typename: types.optional(types.literal("user_role_min_fields"), "user_role_min_fields"),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    changed: types.union(types.undefined, types.null, types.frozen()),
    comment: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    label: types.union(types.undefined, types.null, types.string),
    name: types.union(types.undefined, types.null, types.string),
    sort: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class user_role_min_fieldsModelSelector extends QueryBuilder {
  get _rev_at() { return this.__attr(`_rev_at`) }
  get changed() { return this.__attr(`changed`) }
  get comment() { return this.__attr(`comment`) }
  get id() { return this.__attr(`id`) }
  get label() { return this.__attr(`label`) }
  get name() { return this.__attr(`name`) }
  get sort() { return this.__attr(`sort`) }
}
export function selectFromuser_role_min_fields() {
  return new user_role_min_fieldsModelSelector()
}

export const user_role_min_fieldsModelPrimitives = selectFromuser_role_min_fields()._rev_at.changed.comment.label.name.sort
