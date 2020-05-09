/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { herkunft_fileModel } from "./herkunft_fileModel"
import { herkunft_fileModelSelector } from "./herkunft_fileModel.base"
import { herkunft_file_aggregate_fieldsModel } from "./herkunft_file_aggregate_fieldsModel"
import { herkunft_file_aggregate_fieldsModelSelector } from "./herkunft_file_aggregate_fieldsModel.base"


/**
 * herkunft_file_aggregateBase
 * auto generated base class for the model herkunft_file_aggregateModel.
 *
 * aggregated selection of "herkunft_file"
 */
export const herkunft_file_aggregateModelBase = ModelBase
  .named('herkunft_file_aggregate')
  .props({
    __typename: types.optional(types.literal("herkunft_file_aggregate"), "herkunft_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => herkunft_file_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => herkunft_fileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class herkunft_file_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, herkunft_file_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, herkunft_fileModelSelector, builder) }
}
export function selectFromherkunft_file_aggregate() {
  return new herkunft_file_aggregateModelSelector()
}

export const herkunft_file_aggregateModelPrimitives = selectFromherkunft_file_aggregate()
