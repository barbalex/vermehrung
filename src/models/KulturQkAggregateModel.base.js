/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { KulturQkAggregateFieldsModel } from "./KulturQkAggregateFieldsModel"
import { KulturQkAggregateFieldsModelSelector } from "./KulturQkAggregateFieldsModel.base"
import { KulturQkModel } from "./KulturQkModel"
import { KulturQkModelSelector } from "./KulturQkModel.base"


/**
 * KulturQkAggregateBase
 * auto generated base class for the model KulturQkAggregateModel.
 *
 * aggregated selection of "kultur_qk"
 */
export const KulturQkAggregateModelBase = ModelBase
  .named('KulturQkAggregate')
  .props({
    __typename: types.optional(types.literal("kultur_qk_aggregate"), "kultur_qk_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => KulturQkAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => KulturQkModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class KulturQkAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, KulturQkAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, KulturQkModelSelector, builder) }
}
export function selectFromKulturQkAggregate() {
  return new KulturQkAggregateModelSelector()
}

export const kulturQkAggregateModelPrimitives = selectFromKulturQkAggregate()
