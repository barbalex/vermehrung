/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * person_rev_avg_fieldsBase
 * auto generated base class for the model person_rev_avg_fieldsModel.
 */
export const person_rev_avg_fieldsModelBase = ModelBase
  .named('person_rev_avg_fields')
  .props({
    __typename: types.optional(types.literal("person_rev_avg_fields"), "person_rev_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_rev_avg_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromperson_rev_avg_fields() {
  return new person_rev_avg_fieldsModelSelector()
}

export const person_rev_avg_fieldsModelPrimitives = selectFromperson_rev_avg_fields()._depth._rev_at.plz
