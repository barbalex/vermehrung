/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { teilzaehlung_revModel } from "./teilzaehlung_revModel"
import { teilzaehlung_revModelSelector } from "./teilzaehlung_revModel.base"
import { teilzaehlung_rev_aggregate_fieldsModel } from "./teilzaehlung_rev_aggregate_fieldsModel"
import { teilzaehlung_rev_aggregate_fieldsModelSelector } from "./teilzaehlung_rev_aggregate_fieldsModel.base"


/**
 * teilzaehlung_rev_aggregateBase
 * auto generated base class for the model teilzaehlung_rev_aggregateModel.
 *
 * aggregated selection of "teilzaehlung_rev"
 */
export const teilzaehlung_rev_aggregateModelBase = ModelBase
  .named('teilzaehlung_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("teilzaehlung_rev_aggregate"), "teilzaehlung_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => teilzaehlung_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => teilzaehlung_revModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class teilzaehlung_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, teilzaehlung_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, teilzaehlung_revModelSelector, builder) }
}
export function selectFromteilzaehlung_rev_aggregate() {
  return new teilzaehlung_rev_aggregateModelSelector()
}

export const teilzaehlung_rev_aggregateModelPrimitives = selectFromteilzaehlung_rev_aggregate()
