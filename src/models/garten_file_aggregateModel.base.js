/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { garten_fileModel } from "./garten_fileModel"
import { garten_fileModelSelector } from "./garten_fileModel.base"
import { garten_file_aggregate_fieldsModel } from "./garten_file_aggregate_fieldsModel"
import { garten_file_aggregate_fieldsModelSelector } from "./garten_file_aggregate_fieldsModel.base"


/**
 * garten_file_aggregateBase
 * auto generated base class for the model garten_file_aggregateModel.
 *
 * aggregated selection of "garten_file"
 */
export const garten_file_aggregateModelBase = ModelBase
  .named('garten_file_aggregate')
  .props({
    __typename: types.optional(types.literal("garten_file_aggregate"), "garten_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => garten_file_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => garten_fileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class garten_file_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, garten_file_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, garten_fileModelSelector, builder) }
}
export function selectFromgarten_file_aggregate() {
  return new garten_file_aggregateModelSelector()
}

export const garten_file_aggregateModelPrimitives = selectFromgarten_file_aggregate()
