/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LieferungRevAggregateFieldsModel } from "./LieferungRevAggregateFieldsModel"
import { LieferungRevAggregateFieldsModelSelector } from "./LieferungRevAggregateFieldsModel.base"
import { LieferungRevModel } from "./LieferungRevModel"
import { LieferungRevModelSelector } from "./LieferungRevModel.base"


/**
 * LieferungRevAggregateBase
 * auto generated base class for the model LieferungRevAggregateModel.
 *
 * aggregated selection of "lieferung_rev"
 */
export const LieferungRevAggregateModelBase = ModelBase
  .named('LieferungRevAggregate')
  .props({
    __typename: types.optional(types.literal("lieferung_rev_aggregate"), "lieferung_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => LieferungRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => LieferungRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class LieferungRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, LieferungRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, LieferungRevModelSelector, builder) }
}
export function selectFromLieferungRevAggregate() {
  return new LieferungRevAggregateModelSelector()
}

export const lieferungRevAggregateModelPrimitives = selectFromLieferungRevAggregate()
