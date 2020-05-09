/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonVarSampFieldsBase
 * auto generated base class for the model PersonVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const PersonVarSampFieldsModelBase = ModelBase
  .named('PersonVarSampFields')
  .props({
    __typename: types.optional(types.literal("person_var_samp_fields"), "person_var_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonVarSampFields() {
  return new PersonVarSampFieldsModelSelector()
}

export const personVarSampFieldsModelPrimitives = selectFromPersonVarSampFields()._depth.plz
