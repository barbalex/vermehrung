/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { sammel_lieferungModel } from "./sammel_lieferungModel"
import { sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"
import { sammel_lieferung_aggregate_fieldsModel } from "./sammel_lieferung_aggregate_fieldsModel"
import { sammel_lieferung_aggregate_fieldsModelSelector } from "./sammel_lieferung_aggregate_fieldsModel.base"


/**
 * sammel_lieferung_aggregateBase
 * auto generated base class for the model sammel_lieferung_aggregateModel.
 *
 * aggregated selection of "sammel_lieferung"
 */
export const sammel_lieferung_aggregateModelBase = ModelBase
  .named('sammel_lieferung_aggregate')
  .props({
    __typename: types.optional(types.literal("sammel_lieferung_aggregate"), "sammel_lieferung_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferungModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammel_lieferung_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, sammel_lieferung_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, sammel_lieferungModelSelector, builder) }
}
export function selectFromsammel_lieferung_aggregate() {
  return new sammel_lieferung_aggregateModelSelector()
}

export const sammel_lieferung_aggregateModelPrimitives = selectFromsammel_lieferung_aggregate()
