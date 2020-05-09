/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SammlungRevSumFieldsBase
 * auto generated base class for the model SammlungRevSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const SammlungRevSumFieldsModelBase = ModelBase
  .named('SammlungRevSumFields')
  .props({
    __typename: types.optional(types.literal("sammlung_rev_sum_fields"), "sammlung_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    anzahl_pflanzen: types.union(types.undefined, types.null, types.integer),
    gramm_samen: types.union(types.undefined, types.null, types.integer),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungRevSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromSammlungRevSumFields() {
  return new SammlungRevSumFieldsModelSelector()
}

export const sammlungRevSumFieldsModelPrimitives = selectFromSammlungRevSumFields()._depth.anzahl_pflanzen.gramm_samen.von_anzahl_individuen
