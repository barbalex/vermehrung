/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturStddevPopFieldsBase
 * auto generated base class for the model KulturStddevPopFieldsModel.
 *
 * aggregate stddev_pop on columns
 */
export const KulturStddevPopFieldsModelBase = ModelBase
  .named('KulturStddevPopFields')
  .props({
    __typename: types.optional(types.literal("kultur_stddev_pop_fields"), "kultur_stddev_pop_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturStddevPopFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromKulturStddevPopFields() {
  return new KulturStddevPopFieldsModelSelector()
}

export const kulturStddevPopFieldsModelPrimitives = selectFromKulturStddevPopFields()._depth.von_anzahl_individuen
