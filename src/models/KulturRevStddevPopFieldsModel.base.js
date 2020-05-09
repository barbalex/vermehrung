/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturRevStddevPopFieldsBase
 * auto generated base class for the model KulturRevStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const KulturRevStddevPopFieldsModelBase = ModelBase
  .named('KulturRevStddevPopFields')
  .props({
    __typename: types.optional(types.literal("kultur_rev_stddev_pop_fields"), "kultur_rev_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturRevStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromKulturRevStddevPopFields() {
  return new KulturRevStddevPopFieldsModelSelector()
}

export const kulturRevStddevPopFieldsModelPrimitives = selectFromKulturRevStddevPopFields()._depth.von_anzahl_individuen
