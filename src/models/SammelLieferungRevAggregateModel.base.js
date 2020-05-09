/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { SammelLieferungRevAggregateFieldsModel } from "./SammelLieferungRevAggregateFieldsModel"
import { SammelLieferungRevAggregateFieldsModelSelector } from "./SammelLieferungRevAggregateFieldsModel.base"
import { SammelLieferungRevModel } from "./SammelLieferungRevModel"
import { SammelLieferungRevModelSelector } from "./SammelLieferungRevModel.base"


/**
 * SammelLieferungRevAggregateBase
 * auto generated base class for the model SammelLieferungRevAggregateModel.
 *
 * aggregated selection of "sammel_lieferung_rev"
 */
export const SammelLieferungRevAggregateModelBase = ModelBase
  .named('SammelLieferungRevAggregate')
  .props({
    __typename: types.optional(types.literal("sammel_lieferung_rev_aggregate"), "sammel_lieferung_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => SammelLieferungRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => SammelLieferungRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class SammelLieferungRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, SammelLieferungRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, SammelLieferungRevModelSelector, builder) }
}
export function selectFromSammelLieferungRevAggregate() {
  return new SammelLieferungRevAggregateModelSelector()
}

export const sammelLieferungRevAggregateModelPrimitives = selectFromSammelLieferungRevAggregate()
