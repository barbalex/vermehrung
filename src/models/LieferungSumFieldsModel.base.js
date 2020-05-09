/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * LieferungSumFieldsBase
 * auto generated base class for the model LieferungSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const LieferungSumFieldsModelBase = ModelBase
  .named('LieferungSumFields')
  .props({
    __typename: types.optional(types.literal("lieferung_sum_fields"), "lieferung_sum_fields"),
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

export class LieferungSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromLieferungSumFields() {
  return new LieferungSumFieldsModelSelector()
}

export const lieferungSumFieldsModelPrimitives = selectFromLieferungSumFields()._depth.anzahl_auspflanzbereit.anzahl_pflanzen.gramm_samen.von_anzahl_individuen
