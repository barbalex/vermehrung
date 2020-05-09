/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonRevVarianceFieldsBase
 * auto generated base class for the model PersonRevVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const PersonRevVarianceFieldsModelBase = ModelBase
  .named('PersonRevVarianceFields')
  .props({
    __typename: types.optional(types.literal("person_rev_variance_fields"), "person_rev_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonRevVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonRevVarianceFields() {
  return new PersonRevVarianceFieldsModelSelector()
}

export const personRevVarianceFieldsModelPrimitives = selectFromPersonRevVarianceFields()._depth.plz
