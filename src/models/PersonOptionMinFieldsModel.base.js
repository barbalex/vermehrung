/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonOptionMinFieldsBase
 * auto generated base class for the model PersonOptionMinFieldsModel.
 *
 * aggregate min on columns
 */
export const PersonOptionMinFieldsModelBase = ModelBase
  .named('PersonOptionMinFields')
  .props({
    __typename: types.optional(types.literal("person_option_min_fields"), "person_option_min_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _parent_rev: types.union(types.undefined, types.null, types.string),
    _rev: types.union(types.undefined, types.null, types.string),
    person_id: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionMinFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _parent_rev() { return this.__attr(`_parent_rev`) }
  get _rev() { return this.__attr(`_rev`) }
  get person_id() { return this.__attr(`person_id`) }
}
export function selectFromPersonOptionMinFields() {
  return new PersonOptionMinFieldsModelSelector()
}

export const personOptionMinFieldsModelPrimitives = selectFromPersonOptionMinFields()._depth._parent_rev._rev.person_id
