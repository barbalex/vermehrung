/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SammlungRevVarianceFieldsBase
 * auto generated base class for the model SammlungRevVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const SammlungRevVarianceFieldsModelBase = ModelBase
  .named('SammlungRevVarianceFields')
  .props({
    __typename: types.optional(types.literal("sammlung_rev_variance_fields"), "sammlung_rev_variance_fields"),
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

export class SammlungRevVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromSammlungRevVarianceFields() {
  return new SammlungRevVarianceFieldsModelSelector()
}

export const sammlungRevVarianceFieldsModelPrimitives = selectFromSammlungRevVarianceFields()._depth.anzahl_pflanzen.gramm_samen.von_anzahl_individuen
