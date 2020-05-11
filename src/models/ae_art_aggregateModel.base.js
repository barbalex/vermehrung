/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ae_artModel } from "./ae_artModel"
import { ae_artModelSelector } from "./ae_artModel.base"
import { ae_art_aggregate_fieldsModel } from "./ae_art_aggregate_fieldsModel"
import { ae_art_aggregate_fieldsModelSelector } from "./ae_art_aggregate_fieldsModel.base"


/**
 * ae_art_aggregateBase
 * auto generated base class for the model ae_art_aggregateModel.
 *
 * aggregated selection of "ae_art"
 */
export const ae_art_aggregateModelBase = ModelBase
  .named('ae_art_aggregate')
  .props({
    __typename: types.optional(types.literal("ae_art_aggregate"), "ae_art_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => ae_art_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => ae_artModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class ae_art_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, ae_art_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, ae_artModelSelector, builder) }
}
export function selectFromae_art_aggregate() {
  return new ae_art_aggregateModelSelector()
}

export const ae_art_aggregateModelPrimitives = selectFromae_art_aggregate()
