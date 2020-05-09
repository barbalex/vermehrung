/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { lieferung_fileModel } from "./lieferung_fileModel"
import { lieferung_fileModelSelector } from "./lieferung_fileModel.base"
import { lieferung_file_aggregate_fieldsModel } from "./lieferung_file_aggregate_fieldsModel"
import { lieferung_file_aggregate_fieldsModelSelector } from "./lieferung_file_aggregate_fieldsModel.base"


/**
 * lieferung_file_aggregateBase
 * auto generated base class for the model lieferung_file_aggregateModel.
 *
 * aggregated selection of "lieferung_file"
 */
export const lieferung_file_aggregateModelBase = ModelBase
  .named('lieferung_file_aggregate')
  .props({
    __typename: types.optional(types.literal("lieferung_file_aggregate"), "lieferung_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => lieferung_file_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => lieferung_fileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class lieferung_file_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, lieferung_file_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, lieferung_fileModelSelector, builder) }
}
export function selectFromlieferung_file_aggregate() {
  return new lieferung_file_aggregateModelSelector()
}

export const lieferung_file_aggregateModelPrimitives = selectFromlieferung_file_aggregate()
