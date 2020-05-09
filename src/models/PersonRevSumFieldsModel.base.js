/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonRevSumFieldsBase
 * auto generated base class for the model PersonRevSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const PersonRevSumFieldsModelBase = ModelBase
  .named('PersonRevSumFields')
  .props({
    __typename: types.optional(types.literal("person_rev_sum_fields"), "person_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    plz: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonRevSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonRevSumFields() {
  return new PersonRevSumFieldsModelSelector()
}

export const personRevSumFieldsModelPrimitives = selectFromPersonRevSumFields()._depth.plz
