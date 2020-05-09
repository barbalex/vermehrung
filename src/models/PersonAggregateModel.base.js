/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonAggregateFieldsModel } from "./PersonAggregateFieldsModel"
import { PersonAggregateFieldsModelSelector } from "./PersonAggregateFieldsModel.base"
import { PersonModel } from "./PersonModel"
import { PersonModelSelector } from "./PersonModel.base"


/**
 * PersonAggregateBase
 * auto generated base class for the model PersonAggregateModel.
 *
 * aggregated selection of "person"
 */
export const PersonAggregateModelBase = ModelBase
  .named('PersonAggregate')
  .props({
    __typename: types.optional(types.literal("person_aggregate"), "person_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => PersonAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => PersonModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, PersonAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, PersonModelSelector, builder) }
}
export function selectFromPersonAggregate() {
  return new PersonAggregateModelSelector()
}

export const personAggregateModelPrimitives = selectFromPersonAggregate()
