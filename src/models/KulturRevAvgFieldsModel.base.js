/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturRevAvgFieldsBase
 * auto generated base class for the model KulturRevAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const KulturRevAvgFieldsModelBase = ModelBase
  .named('KulturRevAvgFields')
  .props({
    __typename: types.optional(types.literal("kultur_rev_avg_fields"), "kultur_rev_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturRevAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromKulturRevAvgFields() {
  return new KulturRevAvgFieldsModelSelector()
}

export const kulturRevAvgFieldsModelPrimitives = selectFromKulturRevAvgFields()._depth.von_anzahl_individuen
