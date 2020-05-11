/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_fileModel } from "./art_fileModel"
import { art_fileModelSelector } from "./art_fileModel.base"
import { art_file_aggregate_fieldsModel } from "./art_file_aggregate_fieldsModel"
import { art_file_aggregate_fieldsModelSelector } from "./art_file_aggregate_fieldsModel.base"


/**
 * art_file_aggregateBase
 * auto generated base class for the model art_file_aggregateModel.
 *
 * aggregated selection of "art_file"
 */
export const art_file_aggregateModelBase = ModelBase
  .named('art_file_aggregate')
  .props({
    __typename: types.optional(types.literal("art_file_aggregate"), "art_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => art_file_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => art_fileModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_file_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, art_file_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, art_fileModelSelector, builder) }
}
export function selectFromart_file_aggregate() {
  return new art_file_aggregateModelSelector()
}

export const art_file_aggregateModelPrimitives = selectFromart_file_aggregate()
