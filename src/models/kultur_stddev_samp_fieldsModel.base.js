/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * kultur_stddev_samp_fieldsBase
 * auto generated base class for the model kultur_stddev_samp_fieldsModel.
 *
 * aggregate stddev_samp on columns
 */
export const kultur_stddev_samp_fieldsModelBase = ModelBase
  .named('kultur_stddev_samp_fields')
  .props({
    __typename: types.optional(types.literal("kultur_stddev_samp_fields"), "kultur_stddev_samp_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_stddev_samp_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromkultur_stddev_samp_fields() {
  return new kultur_stddev_samp_fieldsModelSelector()
}

export const kultur_stddev_samp_fieldsModelPrimitives = selectFromkultur_stddev_samp_fields()._depth.von_anzahl_individuen
