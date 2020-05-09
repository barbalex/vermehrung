/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturSumFieldsBase
 * auto generated base class for the model KulturSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const KulturSumFieldsModelBase = ModelBase
  .named('KulturSumFields')
  .props({
    __typename: types.optional(types.literal("kultur_sum_fields"), "kultur_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromKulturSumFields() {
  return new KulturSumFieldsModelSelector()
}

export const kulturSumFieldsModelPrimitives = selectFromKulturSumFields()._depth.von_anzahl_individuen
