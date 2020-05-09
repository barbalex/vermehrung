/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturOptionAggregateFieldsModel } from "./KulturOptionAggregateFieldsModel"
import { KulturOptionAggregateFieldsModelSelector } from "./KulturOptionAggregateFieldsModel.base"
import { KulturOptionModel } from "./KulturOptionModel"
import { KulturOptionModelSelector } from "./KulturOptionModel.base"


/**
 * KulturOptionAggregateBase
 * auto generated base class for the model KulturOptionAggregateModel.
 *
 * aggregated selection of "kultur_option"
 */
export const KulturOptionAggregateModelBase = ModelBase
  .named('KulturOptionAggregate')
  .props({
    __typename: types.optional(types.literal("kultur_option_aggregate"), "kultur_option_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => KulturOptionAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => KulturOptionModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, KulturOptionAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, KulturOptionModelSelector, builder) }
}
export function selectFromKulturOptionAggregate() {
  return new KulturOptionAggregateModelSelector()
}

export const kulturOptionAggregateModelPrimitives = selectFromKulturOptionAggregate()
