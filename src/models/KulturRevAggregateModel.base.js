/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturRevAggregateFieldsModel } from "./KulturRevAggregateFieldsModel"
import { KulturRevAggregateFieldsModelSelector } from "./KulturRevAggregateFieldsModel.base"
import { KulturRevModel } from "./KulturRevModel"
import { KulturRevModelSelector } from "./KulturRevModel.base"


/**
 * KulturRevAggregateBase
 * auto generated base class for the model KulturRevAggregateModel.
 *
 * aggregated selection of "kultur_rev"
 */
export const KulturRevAggregateModelBase = ModelBase
  .named('KulturRevAggregate')
  .props({
    __typename: types.optional(types.literal("kultur_rev_aggregate"), "kultur_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => KulturRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => KulturRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, KulturRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, KulturRevModelSelector, builder) }
}
export function selectFromKulturRevAggregate() {
  return new KulturRevAggregateModelSelector()
}

export const kulturRevAggregateModelPrimitives = selectFromKulturRevAggregate()
