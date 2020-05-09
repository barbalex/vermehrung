/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonOptionVarSampFieldsBase
 * auto generated base class for the model PersonOptionVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const PersonOptionVarSampFieldsModelBase = ModelBase
  .named('PersonOptionVarSampFields')
  .props({
    __typename: types.optional(types.literal("person_option_var_samp_fields"), "person_option_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromPersonOptionVarSampFields() {
  return new PersonOptionVarSampFieldsModelSelector()
}

export const personOptionVarSampFieldsModelPrimitives = selectFromPersonOptionVarSampFields()._depth
