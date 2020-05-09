/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonRevAvgFieldsBase
 * auto generated base class for the model PersonRevAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const PersonRevAvgFieldsModelBase = ModelBase
  .named('PersonRevAvgFields')
  .props({
    __typename: types.optional(types.literal("person_rev_avg_fields"), "person_rev_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonRevAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonRevAvgFields() {
  return new PersonRevAvgFieldsModelSelector()
}

export const personRevAvgFieldsModelPrimitives = selectFromPersonRevAvgFields()._depth.plz
