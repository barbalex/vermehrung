/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ZaehlungRevAggregateFieldsModel } from "./ZaehlungRevAggregateFieldsModel"
import { ZaehlungRevAggregateFieldsModelSelector } from "./ZaehlungRevAggregateFieldsModel.base"
import { ZaehlungRevModel } from "./ZaehlungRevModel"
import { ZaehlungRevModelSelector } from "./ZaehlungRevModel.base"


/**
 * ZaehlungRevAggregateBase
 * auto generated base class for the model ZaehlungRevAggregateModel.
 *
 * aggregated selection of "zaehlung_rev"
 */
export const ZaehlungRevAggregateModelBase = ModelBase
  .named('ZaehlungRevAggregate')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_aggregate"), "zaehlung_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => ZaehlungRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => ZaehlungRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ZaehlungRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, ZaehlungRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, ZaehlungRevModelSelector, builder) }
}
export function selectFromZaehlungRevAggregate() {
  return new ZaehlungRevAggregateModelSelector()
}

export const zaehlungRevAggregateModelPrimitives = selectFromZaehlungRevAggregate()
