/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonOptionVarianceFieldsBase
 * auto generated base class for the model PersonOptionVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const PersonOptionVarianceFieldsModelBase = ModelBase
  .named('PersonOptionVarianceFields')
  .props({
    __typename: types.optional(types.literal("person_option_variance_fields"), "person_option_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromPersonOptionVarianceFields() {
  return new PersonOptionVarianceFieldsModelSelector()
}

export const personOptionVarianceFieldsModelPrimitives = selectFromPersonOptionVarianceFields()._depth
