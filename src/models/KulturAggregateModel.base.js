/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturAggregateFieldsModel } from "./KulturAggregateFieldsModel"
import { KulturAggregateFieldsModelSelector } from "./KulturAggregateFieldsModel.base"
import { KulturModel } from "./KulturModel"
import { KulturModelSelector } from "./KulturModel.base"


/**
 * KulturAggregateBase
 * auto generated base class for the model KulturAggregateModel.
 *
 * aggregated selection of "kultur"
 */
export const KulturAggregateModelBase = ModelBase
  .named('KulturAggregate')
  .props({
    __typename: types.optional(types.literal("kultur_aggregate"), "kultur_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => KulturAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => KulturModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, KulturAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, KulturModelSelector, builder) }
}
export function selectFromKulturAggregate() {
  return new KulturAggregateModelSelector()
}

export const kulturAggregateModelPrimitives = selectFromKulturAggregate()
