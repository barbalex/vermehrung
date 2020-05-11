/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { person_option_revModel } from "./person_option_revModel"
import { person_option_revModelSelector } from "./person_option_revModel.base"
import { person_option_rev_aggregate_fieldsModel } from "./person_option_rev_aggregate_fieldsModel"
import { person_option_rev_aggregate_fieldsModelSelector } from "./person_option_rev_aggregate_fieldsModel.base"


/**
 * person_option_rev_aggregateBase
 * auto generated base class for the model person_option_rev_aggregateModel.
 *
 * aggregated selection of "person_option_rev"
 */
export const person_option_rev_aggregateModelBase = ModelBase
  .named('person_option_rev_aggregate')
  .props({
    __typename: types.optional(types.literal("person_option_rev_aggregate"), "person_option_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => person_option_rev_aggregate_fieldsModel)),
    nodes: types.union(types.undefined, types.array(MSTGQLRef(types.late(() => person_option_revModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class person_option_rev_aggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, person_option_rev_aggregate_fieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, person_option_revModelSelector, builder) }
}
export function selectFromperson_option_rev_aggregate() {
  return new person_option_rev_aggregateModelSelector()
}

export const person_option_rev_aggregateModelPrimitives = selectFromperson_option_rev_aggregate()
