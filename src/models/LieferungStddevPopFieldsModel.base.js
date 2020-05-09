/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * LieferungStddevPopFieldsBase
 * auto generated base class for the model LieferungStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const LieferungStddevPopFieldsModelBase = ModelBase
  .named('LieferungStddevPopFields')
  .props({
    __typename: types.optional(types.literal("lieferung_stddev_pop_fields"), "lieferung_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    anzahl_auspflanzbereit: types.union(types.undefined, types.null, types.number),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
    gramm_samen: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LieferungStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_auspflanzbereit() { return this.__attr(`anzahl_auspflanzbereit`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromLieferungStddevPopFields() {
  return new LieferungStddevPopFieldsModelSelector()
}

export const lieferungStddevPopFieldsModelPrimitives = selectFromLieferungStddevPopFields()._depth.anzahl_auspflanzbereit.anzahl_pflanzen.gramm_samen.von_anzahl_individuen
