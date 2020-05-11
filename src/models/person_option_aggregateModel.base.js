/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { person_optionModel } from "./person_optionModel"
import { person_optionModelSelector } from "./person_optionModel.base"
import { person_option_aggregate_fieldsModel } from "./person_option_aggregate_fieldsModel"
import { person_option_aggregate_fieldsModelSelector } from "./person_option_aggregate_fieldsModel.base"


/**
 * person_option_aggregateBase
 * auto generated base class for the model person_option_aggregateModel.
 *
 * aggregated selection of "person_option"
 */
export const person_option_aggregateModelBase = ModelBase
  .named('person_option_aggregate')
  .props({
    __typename: types.optional(types.literal("person_option_aggregate"), "person_option_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => person_option_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => person_optionModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_option_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, person_option_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, person_optionModelSelector, builder) }
}
export function selectFromperson_option_aggregate() {
  return new person_option_aggregateModelSelector()
}

export const person_option_aggregateModelPrimitives = selectFromperson_option_aggregate()
