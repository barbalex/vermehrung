/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { sammlung_fileModel } from "./sammlung_fileModel"
import { sammlung_fileModelSelector } from "./sammlung_fileModel.base"
import { sammlung_file_aggregate_fieldsModel } from "./sammlung_file_aggregate_fieldsModel"
import { sammlung_file_aggregate_fieldsModelSelector } from "./sammlung_file_aggregate_fieldsModel.base"


/**
 * sammlung_file_aggregateBase
 * auto generated base class for the model sammlung_file_aggregateModel.
 *
 * aggregated selection of "sammlung_file"
 */
export const sammlung_file_aggregateModelBase = ModelBase
  .named('sammlung_file_aggregate')
  .props({
    __typename: types.optional(types.literal("sammlung_file_aggregate"), "sammlung_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => sammlung_file_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammlung_fileModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammlung_file_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, sammlung_file_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, sammlung_fileModelSelector, builder) }
}
export function selectFromsammlung_file_aggregate() {
  return new sammlung_file_aggregateModelSelector()
}

export const sammlung_file_aggregateModelPrimitives = selectFromsammlung_file_aggregate()
