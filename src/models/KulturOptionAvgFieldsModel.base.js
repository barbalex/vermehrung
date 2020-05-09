/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionAvgFieldsBase
 * auto generated base class for the model KulturOptionAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const KulturOptionAvgFieldsModelBase = ModelBase
  .named('KulturOptionAvgFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_avg_fields"), "kultur_option_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionAvgFields() {
  return new KulturOptionAvgFieldsModelSelector()
}

export const kulturOptionAvgFieldsModelPrimitives = selectFromKulturOptionAvgFields()._depth
