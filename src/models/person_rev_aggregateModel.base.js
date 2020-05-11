/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { person_revModel } from "./person_revModel"
import { person_revModelSelector } from "./person_revModel.base"
import { person_rev_aggregate_fieldsModel } from "./person_rev_aggregate_fieldsModel"
import { person_rev_aggregate_fieldsModelSelector } from "./person_rev_aggregate_fieldsModel.base"


/**
 * person_rev_aggregateBase
 * auto generated base class for the model person_rev_aggregateModel.
 *
 * aggregated selection of "person_rev"
 */
export const person_rev_aggregateModelBase = ModelBase
  .named('person_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("person_rev_aggregate"), "person_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => person_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => person_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, person_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, person_revModelSelector, builder) }
}
export function selectFromperson_rev_aggregate() {
  return new person_rev_aggregateModelSelector()
}

export const person_rev_aggregateModelPrimitives = selectFromperson_rev_aggregate()
