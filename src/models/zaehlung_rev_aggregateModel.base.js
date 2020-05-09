/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { zaehlung_revModel } from "./zaehlung_revModel"
import { zaehlung_revModelSelector } from "./zaehlung_revModel.base"
import { zaehlung_rev_aggregate_fieldsModel } from "./zaehlung_rev_aggregate_fieldsModel"
import { zaehlung_rev_aggregate_fieldsModelSelector } from "./zaehlung_rev_aggregate_fieldsModel.base"


/**
 * zaehlung_rev_aggregateBase
 * auto generated base class for the model zaehlung_rev_aggregateModel.
 *
 * aggregated selection of "zaehlung_rev"
 */
export const zaehlung_rev_aggregateModelBase = ModelBase
  .named('zaehlung_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("zaehlung_rev_aggregate"), "zaehlung_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => zaehlung_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => zaehlung_revModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class zaehlung_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, zaehlung_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, zaehlung_revModelSelector, builder) }
}
export function selectFromzaehlung_rev_aggregate() {
  return new zaehlung_rev_aggregateModelSelector()
}

export const zaehlung_rev_aggregateModelPrimitives = selectFromzaehlung_rev_aggregate()
