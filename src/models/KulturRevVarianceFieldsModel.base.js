/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturRevVarianceFieldsBase
 * auto generated base class for the model KulturRevVarianceFieldsModel.
 *
 * aggregate variance on columns
 */
export const KulturRevVarianceFieldsModelBase = ModelBase
  .named('KulturRevVarianceFields')
  .props({
    __typename: types.optional(types.literal("kultur_rev_variance_fields"), "kultur_rev_variance_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturRevVarianceFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromKulturRevVarianceFields() {
  return new KulturRevVarianceFieldsModelSelector()
}

export const kulturRevVarianceFieldsModelPrimitives = selectFromKulturRevVarianceFields()._depth.von_anzahl_individuen
