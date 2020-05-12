/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_rev_stddev_pop_fieldsBase
 * auto generated base class for the model kultur_rev_stddev_pop_fieldsModel.
 */
export const kultur_rev_stddev_pop_fieldsModelBase = ModelBase
  .named('kultur_rev_stddev_pop_fields')
  .props({
    __typename: types.optional(types.literal("kultur_rev_stddev_pop_fields"), "kultur_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_rev_stddev_pop_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromkultur_rev_stddev_pop_fields() {
  return new kultur_rev_stddev_pop_fieldsModelSelector()
}

export const kultur_rev_stddev_pop_fieldsModelPrimitives = selectFromkultur_rev_stddev_pop_fields()._depth.von_anzahl_individuen
