/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonOptionRevVarSampFieldsBase
 * auto generated base class for the model PersonOptionRevVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const PersonOptionRevVarSampFieldsModelBase = ModelBase
  .named('PersonOptionRevVarSampFields')
  .props({
    __typename: types.optional(types.literal("person_option_rev_var_samp_fields"), "person_option_rev_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionRevVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromPersonOptionRevVarSampFields() {
  return new PersonOptionRevVarSampFieldsModelSelector()
}

export const personOptionRevVarSampFieldsModelPrimitives = selectFromPersonOptionRevVarSampFields()._depth
