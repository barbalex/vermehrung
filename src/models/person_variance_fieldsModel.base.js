/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * person_variance_fieldsBase
 * auto generated base class for the model person_variance_fieldsModel.
 */
export const person_variance_fieldsModelBase = ModelBase
  .named('person_variance_fields')
  .props({
    __typename: types.optional(types.literal("person_variance_fields"), "person_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    _rev_at: types.union(types.undefined, types.null, types.number),
    plz: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_variance_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get plz() { return this.__attr(`plz`) }
}
export function selectFromperson_variance_fields() {
  return new person_variance_fieldsModelSelector()
}

export const person_variance_fieldsModelPrimitives = selectFromperson_variance_fields()._depth._rev_at.plz
