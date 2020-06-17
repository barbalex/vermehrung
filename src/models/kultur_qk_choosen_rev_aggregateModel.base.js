/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_qk_choosen_revModel } from "./kultur_qk_choosen_revModel"
import { kultur_qk_choosen_revModelSelector } from "./kultur_qk_choosen_revModel.base"
import { kultur_qk_choosen_rev_aggregate_fieldsModel } from "./kultur_qk_choosen_rev_aggregate_fieldsModel"
import { kultur_qk_choosen_rev_aggregate_fieldsModelSelector } from "./kultur_qk_choosen_rev_aggregate_fieldsModel.base"


/**
 * kultur_qk_choosen_rev_aggregateBase
 * auto generated base class for the model kultur_qk_choosen_rev_aggregateModel.
 */
export const kultur_qk_choosen_rev_aggregateModelBase = ModelBase
  .named('kultur_qk_choosen_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("kultur_qk_choosen_rev_aggregate"), "kultur_qk_choosen_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => kultur_qk_choosen_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_qk_choosen_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_qk_choosen_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, kultur_qk_choosen_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, kultur_qk_choosen_revModelSelector, builder) }
}
export function selectFromkultur_qk_choosen_rev_aggregate() {
  return new kultur_qk_choosen_rev_aggregateModelSelector()
}

export const kultur_qk_choosen_rev_aggregateModelPrimitives = selectFromkultur_qk_choosen_rev_aggregate()
