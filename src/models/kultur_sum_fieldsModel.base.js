/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_sum_fieldsBase
 * auto generated base class for the model kultur_sum_fieldsModel.
 */
export const kultur_sum_fieldsModelBase = ModelBase
  .named('kultur_sum_fields')
  .props({
    __typename: types.optional(types.literal("kultur_sum_fields"), "kultur_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get _rev_at() { return this.__attr(`_rev_at`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromkultur_sum_fields() {
  return new kultur_sum_fieldsModelSelector()
}

export const kultur_sum_fieldsModelPrimitives = selectFromkultur_sum_fields()._depth._rev_at.von_anzahl_individuen
