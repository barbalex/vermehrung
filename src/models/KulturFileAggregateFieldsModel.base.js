/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturFileMaxFieldsModel } from "./KulturFileMaxFieldsModel"
import { KulturFileMaxFieldsModelSelector } from "./KulturFileMaxFieldsModel.base"
import { KulturFileMinFieldsModel } from "./KulturFileMinFieldsModel"
import { KulturFileMinFieldsModelSelector } from "./KulturFileMinFieldsModel.base"


/**
 * KulturFileAggregateFieldsBase
 * auto generated base class for the model KulturFileAggregateFieldsModel.
 *
 * aggregate fields of "kultur_file"
 */
export const KulturFileAggregateFieldsModelBase = ModelBase
  .named('KulturFileAggregateFields')
  .props({
    __typename: types.optional(types.literal("kultur_file_aggregate_fields"), "kultur_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => KulturFileMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => KulturFileMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturFileAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, KulturFileMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, KulturFileMinFieldsModelSelector, builder) }
}
export function selectFromKulturFileAggregateFields() {
  return new KulturFileAggregateFieldsModelSelector()
}

export const kulturFileAggregateFieldsModelPrimitives = selectFromKulturFileAggregateFields().count
