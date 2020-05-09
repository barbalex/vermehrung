/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonRevAggregateFieldsModel } from "./PersonRevAggregateFieldsModel"
import { PersonRevAggregateFieldsModelSelector } from "./PersonRevAggregateFieldsModel.base"
import { PersonRevModel } from "./PersonRevModel"
import { PersonRevModelSelector } from "./PersonRevModel.base"


/**
 * PersonRevAggregateBase
 * auto generated base class for the model PersonRevAggregateModel.
 *
 * aggregated selection of "person_rev"
 */
export const PersonRevAggregateModelBase = ModelBase
  .named('PersonRevAggregate')
  .props({
    __typename: types.optional(types.literal("person_rev_aggregate"), "person_rev_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => PersonRevAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => PersonRevModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonRevAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, PersonRevAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, PersonRevModelSelector, builder) }
}
export function selectFromPersonRevAggregate() {
  return new PersonRevAggregateModelSelector()
}

export const personRevAggregateModelPrimitives = selectFromPersonRevAggregate()
