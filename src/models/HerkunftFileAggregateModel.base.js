/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { HerkunftFileAggregateFieldsModel } from "./HerkunftFileAggregateFieldsModel"
import { HerkunftFileAggregateFieldsModelSelector } from "./HerkunftFileAggregateFieldsModel.base"
import { HerkunftFileModel } from "./HerkunftFileModel"
import { HerkunftFileModelSelector } from "./HerkunftFileModel.base"


/**
 * HerkunftFileAggregateBase
 * auto generated base class for the model HerkunftFileAggregateModel.
 *
 * aggregated selection of "herkunft_file"
 */
export const HerkunftFileAggregateModelBase = ModelBase
  .named('HerkunftFileAggregate')
  .props({
    __typename: types.optional(types.literal("herkunft_file_aggregate"), "herkunft_file_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => HerkunftFileAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => HerkunftFileModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class HerkunftFileAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, HerkunftFileAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, HerkunftFileModelSelector, builder) }
}
export function selectFromHerkunftFileAggregate() {
  return new HerkunftFileAggregateModelSelector()
}

export const herkunftFileAggregateModelPrimitives = selectFromHerkunftFileAggregate()
