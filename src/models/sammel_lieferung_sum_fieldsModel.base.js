/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * sammel_lieferung_sum_fieldsBase
 * auto generated base class for the model sammel_lieferung_sum_fieldsModel.
 *
 * aggregate sum on columns
 */
export const sammel_lieferung_sum_fieldsModelBase = ModelBase
  .named('sammel_lieferung_sum_fields')
  .props({
    __typename: types.optional(types.literal("sammel_lieferung_sum_fields"), "sammel_lieferung_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.integer),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    gramm_samen: types.union(types.undefined, types.null, types.integer),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammel_lieferung_sum_fieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromsammel_lieferung_sum_fields() {
  return new sammel_lieferung_sum_fieldsModelSelector()
}

export const sammel_lieferung_sum_fieldsModelPrimitives = selectFromsammel_lieferung_sum_fields()._depth.anzahl_auspflanzbereit.anzahl_pflanzen.gramm_samen.von_anzahl_individuen
