/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturOptionRevAggregateFieldsModel } from "./KulturOptionRevAggregateFieldsModel"
import { KulturOptionRevAggregateFieldsModelSelector } from "./KulturOptionRevAggregateFieldsModel.base"
import { KulturOptionRevModel } from "./KulturOptionRevModel"
import { KulturOptionRevModelSelector } from "./KulturOptionRevModel.base"


/**
 * KulturOptionRevAggregateBase
 * auto generated base class for the model KulturOptionRevAggregateModel.
 *
 * aggregated selection of "kultur_option_rev"
 */
export const KulturOptionRevAggregateModelBase = ModelBase
  .named('KulturOptionRevAggregate')
  .props({
    __typename: types.optional(types.literal("kultur_option_rev_aggregate"), "kultur_option_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => KulturOptionRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => KulturOptionRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturOptionRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, KulturOptionRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, KulturOptionRevModelSelector, builder) }
}
export function selectFromKulturOptionRevAggregate() {
  return new KulturOptionRevAggregateModelSelector()
}

export const kulturOptionRevAggregateModelPrimitives = selectFromKulturOptionRevAggregate()
