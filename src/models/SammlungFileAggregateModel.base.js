/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammlungFileAggregateFieldsModel } from "./SammlungFileAggregateFieldsModel"
import { SammlungFileAggregateFieldsModelSelector } from "./SammlungFileAggregateFieldsModel.base"
import { SammlungFileModel } from "./SammlungFileModel"
import { SammlungFileModelSelector } from "./SammlungFileModel.base"


/**
 * SammlungFileAggregateBase
 * auto generated base class for the model SammlungFileAggregateModel.
 *
 * aggregated selection of "sammlung_file"
 */
export const SammlungFileAggregateModelBase = ModelBase
  .named('SammlungFileAggregate')
  .props({
    __typename: types.optional(types.literal("sammlung_file_aggregate"), "sammlung_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => SammlungFileAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => SammlungFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammlungFileAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, SammlungFileAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, SammlungFileModelSelector, builder) }
}
export function selectFromSammlungFileAggregate() {
  return new SammlungFileAggregateModelSelector()
}

export const sammlungFileAggregateModelPrimitives = selectFromSammlungFileAggregate()
