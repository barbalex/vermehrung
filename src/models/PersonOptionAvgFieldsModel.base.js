/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonOptionAvgFieldsBase
 * auto generated base class for the model PersonOptionAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const PersonOptionAvgFieldsModelBase = ModelBase
  .named('PersonOptionAvgFields')
  .props({
    __typename: types.optional(types.literal("person_option_avg_fields"), "person_option_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromPersonOptionAvgFields() {
  return new PersonOptionAvgFieldsModelSelector()
}

export const personOptionAvgFieldsModelPrimitives = selectFromPersonOptionAvgFields()._depth
