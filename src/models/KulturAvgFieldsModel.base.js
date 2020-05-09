/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturAvgFieldsBase
 * auto generated base class for the model KulturAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const KulturAvgFieldsModelBase = ModelBase
  .named('KulturAvgFields')
  .props({
    __typename: types.optional(types.literal("kultur_avg_fields"), "kultur_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromKulturAvgFields() {
  return new KulturAvgFieldsModelSelector()
}

export const kulturAvgFieldsModelPrimitives = selectFromKulturAvgFields()._depth.von_anzahl_individuen
