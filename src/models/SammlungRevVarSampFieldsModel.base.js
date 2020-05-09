/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * SammlungRevVarSampFieldsBase
 * auto generated base class for the model SammlungRevVarSampFieldsModel.
 *
 * aggregate var_samp on columns
 */
export const SammlungRevVarSampFieldsModelBase = ModelBase
  .named('SammlungRevVarSampFields')
  .props({
    __typename: types.optional(types.literal("sammlung_rev_var_samp_fields"), "sammlung_rev_var_samp_fields"),
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

export class SammlungRevVarSampFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get anzahl_pflanzen() { return this.__attr(`anzahl_pflanzen`) }
  get gramm_samen() { return this.__attr(`gramm_samen`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromSammlungRevVarSampFields() {
  return new SammlungRevVarSampFieldsModelSelector()
}

export const sammlungRevVarSampFieldsModelPrimitives = selectFromSammlungRevVarSampFields()._depth.anzahl_pflanzen.gramm_samen.von_anzahl_individuen
