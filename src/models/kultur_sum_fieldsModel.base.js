/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_sum_fieldsBase
 * auto generated base class for the model kultur_sum_fieldsModel.
 *
 * aggregate sum on columns
 */
export const kultur_sum_fieldsModelBase = ModelBase
  .named('kultur_sum_fields')
  .props({
    __typename: types.optional(types.literal("kultur_sum_fields"), "kultur_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromkultur_sum_fields() {
  return new kultur_sum_fieldsModelSelector()
}

export const kultur_sum_fieldsModelPrimitives = selectFromkultur_sum_fields()._depth.von_anzahl_individuen
