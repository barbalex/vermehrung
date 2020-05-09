/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturRevSumFieldsBase
 * auto generated base class for the model KulturRevSumFieldsModel.
 *
 * aggregate sum on columns
 */
export const KulturRevSumFieldsModelBase = ModelBase
  .named('KulturRevSumFields')
  .props({
    __typename: types.optional(types.literal("kultur_rev_sum_fields"), "kultur_rev_sum_fields"),
    _depth: types.union(types.undefined, types.null, types.integer),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturRevSumFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromKulturRevSumFields() {
  return new KulturRevSumFieldsModelSelector()
}

export const kulturRevSumFieldsModelPrimitives = selectFromKulturRevSumFields()._depth.von_anzahl_individuen
