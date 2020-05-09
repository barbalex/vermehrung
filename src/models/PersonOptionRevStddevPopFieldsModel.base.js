/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonOptionRevStddevPopFieldsBase
 * auto generated base class for the model PersonOptionRevStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const PersonOptionRevStddevPopFieldsModelBase = ModelBase
  .named('PersonOptionRevStddevPopFields')
  .props({
    __typename: types.optional(types.literal("person_option_rev_stddev_pop_fields"), "person_option_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionRevStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromPersonOptionRevStddevPopFields() {
  return new PersonOptionRevStddevPopFieldsModelSelector()
}

export const personOptionRevStddevPopFieldsModelPrimitives = selectFromPersonOptionRevStddevPopFields()._depth
