/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { kultur_optionModel } from "./kultur_optionModel"
import { kultur_optionModelSelector } from "./kultur_optionModel.base"
import { kultur_option_aggregate_fieldsModel } from "./kultur_option_aggregate_fieldsModel"
import { kultur_option_aggregate_fieldsModelSelector } from "./kultur_option_aggregate_fieldsModel.base"


/**
 * kultur_option_aggregateBase
 * auto generated base class for the model kultur_option_aggregateModel.
 *
 * aggregated selection of "kultur_option"
 */
export const kultur_option_aggregateModelBase = ModelBase
  .named('kultur_option_aggregate')
  .props({
    __typename: types.optional(types.literal("kultur_option_aggregate"), "kultur_option_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => kultur_option_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => kultur_optionModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class kultur_option_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, kultur_option_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, kultur_optionModelSelector, builder) }
}
export function selectFromkultur_option_aggregate() {
  return new kultur_option_aggregateModelSelector()
}

export const kultur_option_aggregateModelPrimitives = selectFromkultur_option_aggregate()
