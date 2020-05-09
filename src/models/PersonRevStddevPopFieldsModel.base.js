/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonRevStddevPopFieldsBase
 * auto generated base class for the model PersonRevStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const PersonRevStddevPopFieldsModelBase = ModelBase
  .named('PersonRevStddevPopFields')
  .props({
    __typename: types.optional(types.literal("person_rev_stddev_pop_fields"), "person_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonRevStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonRevStddevPopFields() {
  return new PersonRevStddevPopFieldsModelSelector()
}

export const personRevStddevPopFieldsModelPrimitives = selectFromPersonRevStddevPopFields()._depth.plz
