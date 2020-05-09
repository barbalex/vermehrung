/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { GartenFileAggregateFieldsModel } from "./GartenFileAggregateFieldsModel"
import { GartenFileAggregateFieldsModelSelector } from "./GartenFileAggregateFieldsModel.base"
import { GartenFileModel } from "./GartenFileModel"
import { GartenFileModelSelector } from "./GartenFileModel.base"


/**
 * GartenFileAggregateBase
 * auto generated base class for the model GartenFileAggregateModel.
 *
 * aggregated selection of "garten_file"
 */
export const GartenFileAggregateModelBase = ModelBase
  .named('GartenFileAggregate')
  .props({
    __typename: types.optional(types.literal("garten_file_aggregate"), "garten_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => GartenFileAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => GartenFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class GartenFileAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, GartenFileAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, GartenFileModelSelector, builder) }
}
export function selectFromGartenFileAggregate() {
  return new GartenFileAggregateModelSelector()
}

export const gartenFileAggregateModelPrimitives = selectFromGartenFileAggregate()
