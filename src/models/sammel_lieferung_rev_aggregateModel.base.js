/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { sammel_lieferung_revModel } from "./sammel_lieferung_revModel"
import { sammel_lieferung_revModelSelector } from "./sammel_lieferung_revModel.base"
import { sammel_lieferung_rev_aggregate_fieldsModel } from "./sammel_lieferung_rev_aggregate_fieldsModel"
import { sammel_lieferung_rev_aggregate_fieldsModelSelector } from "./sammel_lieferung_rev_aggregate_fieldsModel.base"


/**
 * sammel_lieferung_rev_aggregateBase
 * auto generated base class for the model sammel_lieferung_rev_aggregateModel.
 */
export const sammel_lieferung_rev_aggregateModelBase = ModelBase
  .named('sammel_lieferung_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("sammel_lieferung_rev_aggregate"), "sammel_lieferung_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => sammel_lieferung_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => sammel_lieferung_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class sammel_lieferung_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, sammel_lieferung_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, sammel_lieferung_revModelSelector, builder) }
}
export function selectFromsammel_lieferung_rev_aggregate() {
  return new sammel_lieferung_rev_aggregateModelSelector()
}

export const sammel_lieferung_rev_aggregateModelPrimitives = selectFromsammel_lieferung_rev_aggregate()
