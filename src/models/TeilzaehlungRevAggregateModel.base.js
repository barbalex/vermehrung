/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { TeilzaehlungRevAggregateFieldsModel } from "./TeilzaehlungRevAggregateFieldsModel"
import { TeilzaehlungRevAggregateFieldsModelSelector } from "./TeilzaehlungRevAggregateFieldsModel.base"
import { TeilzaehlungRevModel } from "./TeilzaehlungRevModel"
import { TeilzaehlungRevModelSelector } from "./TeilzaehlungRevModel.base"


/**
 * TeilzaehlungRevAggregateBase
 * auto generated base class for the model TeilzaehlungRevAggregateModel.
 *
 * aggregated selection of "teilzaehlung_rev"
 */
export const TeilzaehlungRevAggregateModelBase = ModelBase
  .named('TeilzaehlungRevAggregate')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_rev_aggregate"), "teilzaehlung_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => TeilzaehlungRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => TeilzaehlungRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TeilzaehlungRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, TeilzaehlungRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, TeilzaehlungRevModelSelector, builder) }
}
export function selectFromTeilzaehlungRevAggregate() {
  return new TeilzaehlungRevAggregateModelSelector()
}

export const teilzaehlungRevAggregateModelPrimitives = selectFromTeilzaehlungRevAggregate()
