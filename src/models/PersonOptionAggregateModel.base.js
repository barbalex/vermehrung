/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PersonOptionAggregateFieldsModel } from "./PersonOptionAggregateFieldsModel"
import { PersonOptionAggregateFieldsModelSelector } from "./PersonOptionAggregateFieldsModel.base"
import { PersonOptionModel } from "./PersonOptionModel"
import { PersonOptionModelSelector } from "./PersonOptionModel.base"


/**
 * PersonOptionAggregateBase
 * auto generated base class for the model PersonOptionAggregateModel.
 *
 * aggregated selection of "person_option"
 */
export const PersonOptionAggregateModelBase = ModelBase
  .named('PersonOptionAggregate')
  .props({
    __typename: types.optional(types.literal("person_option_aggregate"), "person_option_aggregate"),
    aggregate: types.union(types.undefined, types.null, types.late(() => PersonOptionAggregateFieldsModel)),
    nodes: types.union(types.undefined, types.array(types.late(() => PersonOptionModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class PersonOptionAggregateModelSelector extends QueryBuilder {
  aggregate(builder) { return this.__child(`aggregate`, PersonOptionAggregateFieldsModelSelector, builder) }
  nodes(builder) { return this.__child(`nodes`, PersonOptionModelSelector, builder) }
}
export function selectFromPersonOptionAggregate() {
  return new PersonOptionAggregateModelSelector()
}

export const personOptionAggregateModelPrimitives = selectFromPersonOptionAggregate()
