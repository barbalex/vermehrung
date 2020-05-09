/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturRevStddevFieldsBase
 * auto generated base class for the model KulturRevStddevFieldsModel.
 *
 * aggregate stddev on columns
 */
export const KulturRevStddevFieldsModelBase = ModelBase
  .named('KulturRevStddevFields')
  .props({
    __typename: types.optional(types.literal("kultur_rev_stddev_fields"), "kultur_rev_stddev_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
    von_anzahl_individuen: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturRevStddevFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
  get von_anzahl_individuen() { return this.__attr(`von_anzahl_individuen`) }
}
export function selectFromKulturRevStddevFields() {
  return new KulturRevStddevFieldsModelSelector()
}

export const kulturRevStddevFieldsModelPrimitives = selectFromKulturRevStddevFields()._depth.von_anzahl_individuen
