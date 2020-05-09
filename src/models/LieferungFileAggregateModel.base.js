/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LieferungFileAggregateFieldsModel } from "./LieferungFileAggregateFieldsModel"
import { LieferungFileAggregateFieldsModelSelector } from "./LieferungFileAggregateFieldsModel.base"
import { LieferungFileModel } from "./LieferungFileModel"
import { LieferungFileModelSelector } from "./LieferungFileModel.base"


/**
 * LieferungFileAggregateBase
 * auto generated base class for the model LieferungFileAggregateModel.
 *
 * aggregated selection of "lieferung_file"
 */
export const LieferungFileAggregateModelBase = ModelBase
  .named('LieferungFileAggregate')
  .props({
    __typename: types.optional(types.literal("lieferung_file_aggregate"), "lieferung_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => LieferungFileAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => LieferungFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LieferungFileAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, LieferungFileAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, LieferungFileModelSelector, builder) }
}
export function selectFromLieferungFileAggregate() {
  return new LieferungFileAggregateModelSelector()
}

export const lieferungFileAggregateModelPrimitives = selectFromLieferungFileAggregate()
