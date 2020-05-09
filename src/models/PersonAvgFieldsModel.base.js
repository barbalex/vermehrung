/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * PersonAvgFieldsBase
 * auto generated base class for the model PersonAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const PersonAvgFieldsModelBase = ModelBase
  .named('PersonAvgFields')
  .props({
    __typename: types.optional(types.literal("person_avg_fields"), "person_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromPersonAvgFields() {
  return new PersonAvgFieldsModelSelector()
}

export const personAvgFieldsModelPrimitives = selectFromPersonAvgFields()._depth.plz
