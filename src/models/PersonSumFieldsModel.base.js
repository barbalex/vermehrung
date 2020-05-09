/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonSumFieldsBase
 * auto generated base class for the model PersonSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const PersonSumFieldsModelBase = ModelBase
  .named('PersonSumFields')
  .props({
    __typename: types.optional(types.literal("person_sum_fields"), "person_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    plz: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonSumFields() {
  return new PersonSumFieldsModelSelector()
}

export const personSumFieldsModelPrimitives = selectFromPersonSumFields()._depth.plz
