/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { zaehlungModel } from "./zaehlungModel"
import { zaehlungModelSelector } from "./zaehlungModel.base"
import { zaehlung_aggregate_fieldsModel } from "./zaehlung_aggregate_fieldsModel"
import { zaehlung_aggregate_fieldsModelSelector } from "./zaehlung_aggregate_fieldsModel.base"


/**
 * zaehlung_aggregateBase
 * auto generated base class for the model zaehlung_aggregateModel.
 *
 * aggregated selection of "zaehlung"
 */
export const zaehlung_aggregateModelBase = ModelBase
  .named('zaehlung_aggregate')
  .props({
    __typename: types.optional(types.literal("zaehlung_aggregate"), "zaehlung_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => zaehlung_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => zaehlungModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class zaehlung_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, zaehlung_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, zaehlungModelSelector, builder) }
}
export function selectFromzaehlung_aggregate() {
  return new zaehlung_aggregateModelSelector()
}

export const zaehlung_aggregateModelPrimitives = selectFromzaehlung_aggregate()
