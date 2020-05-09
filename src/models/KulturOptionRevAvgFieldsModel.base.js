/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturOptionRevAvgFieldsBase
 * auto generated base class for the model KulturOptionRevAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const KulturOptionRevAvgFieldsModelBase = ModelBase
  .named('KulturOptionRevAvgFields')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_avg_fields"), "kultur_option_rev_avg_fields"),
    _depth: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionRevAvgFieldsModelSelector extends QueryBuilder {
  get _depth() { return this.__attr(`_depth`) }
}
export function selectFromKulturOptionRevAvgFields() {
  return new KulturOptionRevAvgFieldsModelSelector()
}

export const kulturOptionRevAvgFieldsModelPrimitives = selectFromKulturOptionRevAvgFields()._depth
