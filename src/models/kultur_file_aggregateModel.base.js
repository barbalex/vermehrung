/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_fileModel } from "./kultur_fileModel"
import { kultur_fileModelSelector } from "./kultur_fileModel.base"
import { kultur_file_aggregate_fieldsModel } from "./kultur_file_aggregate_fieldsModel"
import { kultur_file_aggregate_fieldsModelSelector } from "./kultur_file_aggregate_fieldsModel.base"


/**
 * kultur_file_aggregateBase
 * auto generated base class for the model kultur_file_aggregateModel.
 *
 * aggregated selection of "kultur_file"
 */
export const kultur_file_aggregateModelBase = ModelBase
  .named('kultur_file_aggregate')
  .props({
    __typename: types.optional(types.literal("kultur_file_aggregate"), "kultur_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => kultur_file_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => kultur_fileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_file_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, kultur_file_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, kultur_fileModelSelector, builder) }
}
export function selectFromkultur_file_aggregate() {
  return new kultur_file_aggregateModelSelector()
}

export const kultur_file_aggregateModelPrimitives = selectFromkultur_file_aggregate()
