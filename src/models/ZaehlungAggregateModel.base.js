/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ZaehlungAggregateFieldsModel } from "./ZaehlungAggregateFieldsModel"
import { ZaehlungAggregateFieldsModelSelector } from "./ZaehlungAggregateFieldsModel.base"
import { ZaehlungModel } from "./ZaehlungModel"
import { ZaehlungModelSelector } from "./ZaehlungModel.base"


/**
 * ZaehlungAggregateBase
 * auto generated base class for the model ZaehlungAggregateModel.
 *
 * aggregated selection of "zaehlung"
 */
export const ZaehlungAggregateModelBase = ModelBase
  .named('ZaehlungAggregate')
  .props({
    __typename: types.optional(types.literal("zaehlung_aggregate"), "zaehlung_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => ZaehlungAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => ZaehlungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, ZaehlungAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, ZaehlungModelSelector, builder) }
}
export function selectFromZaehlungAggregate() {
  return new ZaehlungAggregateModelSelector()
}

export const zaehlungAggregateModelPrimitives = selectFromZaehlungAggregate()
