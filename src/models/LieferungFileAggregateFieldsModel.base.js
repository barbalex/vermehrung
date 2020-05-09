/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LieferungFileMaxFieldsModel } from "./LieferungFileMaxFieldsModel"
import { LieferungFileMaxFieldsModelSelector } from "./LieferungFileMaxFieldsModel.base"
import { LieferungFileMinFieldsModel } from "./LieferungFileMinFieldsModel"
import { LieferungFileMinFieldsModelSelector } from "./LieferungFileMinFieldsModel.base"


/**
 * LieferungFileAggregateFieldsBase
 * auto generated base class for the model LieferungFileAggregateFieldsModel.
 *
 * aggregate fields of "lieferung_file"
 */
export const LieferungFileAggregateFieldsModelBase = ModelBase
  .named('LieferungFileAggregateFields')
  .props({
    __typename: types.optional(types.literal("lieferung_file_aggregate_fields"), "lieferung_file_aggregate_fields"),
    count: types.union(types.undefined, types.null, types.integer),
    max: types.union(types.undefined, types.null, types.late(() => LieferungFileMaxFieldsModel)),
    min: types.union(types.undefined, types.null, types.late(() => LieferungFileMinFieldsModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LieferungFileAggregateFieldsModelSelector extends QueryBuilder {
  get count() { return this.__attr(`count`) }
  max(builder) { return this.__child(`max`, LieferungFileMaxFieldsModelSelector, builder) }
  min(builder) { return this.__child(`min`, LieferungFileMinFieldsModelSelector, builder) }
}
export function selectFromLieferungFileAggregateFields() {
  return new LieferungFileAggregateFieldsModelSelector()
}

export const lieferungFileAggregateFieldsModelPrimitives = selectFromLieferungFileAggregateFields().count
