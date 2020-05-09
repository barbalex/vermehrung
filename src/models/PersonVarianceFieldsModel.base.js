/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonVarianceFieldsBase
 * auto generated base class for the model PersonVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const PersonVarianceFieldsModelBase = ModelBase
  .named('PersonVarianceFields')
  .props({
    __typename: types.optional(types.literal("person_variance_fields"), "person_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonVarianceFields() {
  return new PersonVarianceFieldsModelSelector()
}

export const personVarianceFieldsModelPrimitives = selectFromPersonVarianceFields()._depth.plz
