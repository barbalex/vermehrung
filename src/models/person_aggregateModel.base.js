/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { personModel } from "./personModel"
import { personModelSelector } from "./personModel.base"
import { person_aggregate_fieldsModel } from "./person_aggregate_fieldsModel"
import { person_aggregate_fieldsModelSelector } from "./person_aggregate_fieldsModel.base"


/**
 * person_aggregateBase
 * auto generated base class for the model person_aggregateModel.
 *
 * aggregated selection of "person"
 */
export const person_aggregateModelBase = ModelBase
  .named('person_aggregate')
  .props({
    __typename: types.optional(types.literal("person_aggregate"), "person_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => person_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => personModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, person_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, personModelSelector, builder) }
}
export function selectFromperson_aggregate() {
  return new person_aggregateModelSelector()
}

export const person_aggregateModelPrimitives = selectFromperson_aggregate()
