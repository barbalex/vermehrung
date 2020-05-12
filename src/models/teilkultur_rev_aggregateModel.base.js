/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { teilkultur_revModel } from "./teilkultur_revModel"
import { teilkultur_revModelSelector } from "./teilkultur_revModel.base"
import { teilkultur_rev_aggregate_fieldsModel } from "./teilkultur_rev_aggregate_fieldsModel"
import { teilkultur_rev_aggregate_fieldsModelSelector } from "./teilkultur_rev_aggregate_fieldsModel.base"


/**
 * teilkultur_rev_aggregateBase
 * auto generated base class for the model teilkultur_rev_aggregateModel.
 */
export const teilkultur_rev_aggregateModelBase = ModelBase
  .named('teilkultur_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("teilkultur_rev_aggregate"), "teilkultur_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => teilkultur_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => teilkultur_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilkultur_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, teilkultur_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, teilkultur_revModelSelector, builder) }
}
export function selectFromteilkultur_rev_aggregate() {
  return new teilkultur_rev_aggregateModelSelector()
}

export const teilkultur_rev_aggregateModelPrimitives = selectFromteilkultur_rev_aggregate()
