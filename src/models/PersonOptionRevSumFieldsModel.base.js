/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonOptionRevSumFieldsBase
 * auto generated base class for the model PersonOptionRevSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const PersonOptionRevSumFieldsModelBase = ModelBase
  .named('PersonOptionRevSumFields')
  .props({
    __typename: types.optional(types.literal("person_option_rev_sum_fields"), "person_option_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionRevSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromPersonOptionRevSumFields() {
  return new PersonOptionRevSumFieldsModelSelector()
}

export const personOptionRevSumFieldsModelPrimitives = selectFromPersonOptionRevSumFields()._depth
