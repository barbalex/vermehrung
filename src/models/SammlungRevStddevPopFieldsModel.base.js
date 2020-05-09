/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SammlungRevStddevPopFieldsBase
 * auto generated base class for the model SammlungRevStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const SammlungRevStddevPopFieldsModelBase = ModelBase
  .named('SammlungRevStddevPopFields')
  .props({
    __typename: types.optional(types.literal("sammlung_rev_stddev_pop_fields"), "sammlung_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.number),
    gramm_samen: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungRevStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromSammlungRevStddevPopFields() {
  return new SammlungRevStddevPopFieldsModelSelector()
}

export const sammlungRevStddevPopFieldsModelPrimitives = selectFromSammlungRevStddevPopFields()._depth.anzahl_pflanzen.gramm_samen.von_anzahl_individuen
