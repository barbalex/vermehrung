/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { art_qk_choosenModel } from "./art_qk_choosenModel"
import { art_qk_choosenModelSelector } from "./art_qk_choosenModel.base"
import { art_qk_choosen_aggregate_fieldsModel } from "./art_qk_choosen_aggregate_fieldsModel"
import { art_qk_choosen_aggregate_fieldsModelSelector } from "./art_qk_choosen_aggregate_fieldsModel.base"


/**
 * art_qk_choosen_aggregateBase
 * auto generated base class for the model art_qk_choosen_aggregateModel.
 *
 * aggregated selection of "art_qk_choosen"
 */
export const art_qk_choosen_aggregateModelBase = ModelBase
  .named('art_qk_choosen_aggregate')
  .props({
    __typename: types.optional(types.literal("art_qk_choosen_aggregate"), "art_qk_choosen_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => art_qk_choosen_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => art_qk_choosenModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class art_qk_choosen_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, art_qk_choosen_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, art_qk_choosenModelSelector, builder) }
}
export function selectFromart_qk_choosen_aggregate() {
  return new art_qk_choosen_aggregateModelSelector()
}

export const art_qk_choosen_aggregateModelPrimitives = selectFromart_qk_choosen_aggregate()
