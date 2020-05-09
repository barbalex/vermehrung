/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * KulturQkAvgFieldsBase
 * auto generated base class for the model KulturQkAvgFieldsModel.
 *
 * aggregate avg on columns
 */
export const KulturQkAvgFieldsModelBase = ModelBase
  .named('KulturQkAvgFields')
  .props({
    __typename: types.optional(types.literal("kultur_qk_avg_fields"), "kultur_qk_avg_fields"),
    sort: types.union(types.undefined, types.null, types.number),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkAvgFieldsModelSelector extends QueryBuilder {
  get sort() { return this.__attr(`sort`) }
}
export function selectFromKulturQkAvgFields() {
  return new KulturQkAvgFieldsModelSelector()
}

export const kulturQkAvgFieldsModelPrimitives = selectFromKulturQkAvgFields().sort
