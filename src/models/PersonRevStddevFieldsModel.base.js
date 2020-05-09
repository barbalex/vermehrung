/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonRevStddevFieldsBase
 * auto generated base class for the model PersonRevStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const PersonRevStddevFieldsModelBase = ModelBase
  .named('PersonRevStddevFields')
  .props({
    __typename: types.optional(types.literal("person_rev_stddev_fields"), "person_rev_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonRevStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonRevStddevFields() {
  return new PersonRevStddevFieldsModelSelector()
}

export const personRevStddevFieldsModelPrimitives = selectFromPersonRevStddevFields()._depth.plz
